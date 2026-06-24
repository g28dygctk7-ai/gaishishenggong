// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BossConfig, { BossBasic } from "../../config/BossConfig";
import BossSkillConfig, { BossSkillBasic, BossSkillLevelBasic } from "../../config/BossSkillConfig";
import CacheKey from "../../config/CacheKey";
import FightConfig, { FightBasic } from "../../config/FightConfig";
import ItemConfig, { ItemBasic } from "../../config/ItemConfig";
import PlayerFightSkillConfig, { PlayerFightSkillBasic, PlayerFightSkillLevelBasic } from "../../config/PlayerFightSkillConfig";
import SceneKey from "../../config/SceneKey";
import SkillConfig from "../../config/SkillConfig";
import TaskConfig from "../../config/TaskConfig";
import SpriteManager from "../../manager/SpriteManager";
import ButtonUtil from "../../utils/ButtonUtil";
import CacheUtil from "../../utils/CacheUtil";
import MathUtil from "../../utils/MathUtil";
import SdkCtrl from "../../utils/WxSdkUtil";
import PlayerCacheCtrl from "../PlayerCacheCtrl";
import TipCtrl from "../TipCtrl";
import BossCtrl from "./BossCtrl";
import BossBaseSkill from "./bossSkill/BossBaseSkill";
import DurationLineSkill from "./bossSkill/DurationLineSkill";
import SingleLineSkill from "./bossSkill/SingleLineSkill";
import PlayerCtrl from "./PlayerCtrl";
import PlayerFightBaseSkill from "./playerSkill/PlayerFightBaseSkill";
import PlayerFixSkill from "./playerSkill/PlayerFixSkill";
import PlayerSingleLineSkill from "./playerSkill/PlayerSingleLineSkill";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightCtrl extends cc.Component {

    @property({ type: cc.Node, tooltip: "玩家节点" })
    player: cc.Node = null;

    @property({ type: cc.Node, tooltip: "boss节点" })
    boss: cc.Node = null;

    @property({ type: cc.Node, tooltip: "场景节点" })
    map: cc.Node = null;

    @property({ type: cc.Node, tooltip: "暂停界面节点" })
    pauseNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "玩家死亡节点" })
    playerDieNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "结算节点" })
    settlementNode: cc.Node = null;

    @property({ type: cc.Button, tooltip: "复活按钮" })
    reviveButton: cc.Button = null;

    @property({ type: cc.Prefab, tooltip: "奖励物品预制体" })
    itemPrefab: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "boss单个直线子弹预制体" })
    singleLinePrefab: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "boss持续性直线子弹预制体" })
    durationLinePrefab: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "玩家单个直线子弹预制体" })
    playerSingleLinePrefab: cc.Prefab = null;
    @property({ type: cc.Prefab, tooltip: "玩家固定技能预制体" })
    playerFixPrefab: cc.Prefab = null;

    /**
     * 是否为准备阶段
     */
    private _isPrepare = true;

    /**
     * 准备阶段提示
     */
    private _prepareTip = "准备战斗";

    /**
     * 剩余复活的次数
     */
    private _canReviveCount = 3;

    /**
     * 房间创建时间
     */
    private _roomCreateTime: number = new Date().getTime();

    /**
     * 当前时间,毫秒时间戳
     */
    private _nowTime: number = new Date().getTime();

    /**
     * 当前房间时间,从0毫秒开始
     */
    private _roomTime: number = 0;

    /**
     * 开始战斗时间 - 3秒后
     */
    private _startFightTime: number = 3;

    /**
     * 关卡配置
     */
    private _fightConfig: FightBasic = null;

    /**
     * 挑战结束
     */
    private _gameOver: boolean = false;

    /**
     * boss血量
     */
    private _bossHp: number = 0;

    /**
     * boss配置信息
     */
    private _bossConfig: BossBasic = null;

    /**
    * boss技能信息
    */
    private _bossSkillInfo = {};

    /**
    * 玩家技能信息
    */
    private _playerFightSkillInfo = {};

    /**
     * 游戏暂停中
     */
    private _isPause = false;

    onLoad() {
        // 加载挑战关卡信息
        let fightId = CacheUtil.getInstance().get(CacheKey.FIGHT_ID);
        this.loadFightConfig(Number(fightId));

        // 加载玩家信息
        this.loadPlayer();
    }

    start() {

    }

    /**
     * 加载玩家信息
     */
    loadPlayer() {
        // 获取记录的挑战关卡
        this.player.getComponent(PlayerCtrl).initPlayer();

        // 加载玩家技能列表
        this.loadPlayerSkill();
    }


    /**
     * 加载挑战关卡信息
     */
    loadFightConfig(fightId: number) {
        // 获取记录的挑战关卡
        this._fightConfig = FightConfig.getConfigById(fightId);

        // 加载场景
        this.loadMapPic();

        // 加载boss
        this.loadBoss();

        // 移除记录的挑战关卡
        CacheUtil.getInstance().remove(CacheKey.FIGHT_ID);
    }


    /**
     * 加载场景
     */
    async loadMapPic() {
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.map.getComponent(cc.Sprite),this._fightConfig.mapPic);
    }

    update(dt) {
        // 挑战结束
        if (this._gameOver) {
            return;
        }

        // 玩家死亡
        if (!this.player.getComponent(PlayerCtrl).isAlive) {
            return;
        }

        // 准备阶段
        this.checkPrepare();

        // 更新时间
        this._nowTime = new Date().getTime();
        this._roomTime += dt;

        // 开始检查技能释放
        if(this._roomTime >= this._startFightTime) {
            if(this._isPrepare) {
                this._isPrepare = false;
            }

            this.checkBossSkill();
            this.checkPlayerSkill();
        }

    }

    /**
     * 准备阶段处理
     */
    private checkPrepare() {
        if(!this._isPrepare) {
            return;
        }

        // 更新提示文本
        let subTime = this._startFightTime - this._roomTime;
        if(Math.ceil(subTime) <= 0) {
            return;
        }
        
        let tempTip = Math.ceil(subTime) + "秒后开始战斗";
        if(this._prepareTip == tempTip) {
            return;
        }

        this._prepareTip = tempTip;
        TipCtrl.getInstance().tip(this.node,this._prepareTip);
    }


    // 展示暂停界面
    public showPause() {
        if (!this.player.getComponent(PlayerCtrl).isAlive || this._gameOver || this._isPause) {
            return;
        }

        this._isPause = true;

        // AudioManager.getInstance().playerAudio(AudioPathKey.OPEN_VIEW_AUDIO,false);

        // 渲染属性
        // let playerFightProp:PlayerFightProp = PlayerFightPropCtrl.getInstance().fightProp;

        // this.hpLabel.string = playerFightProp.hp + "";
        // this.hpRecoveryLabel.string = playerFightProp.hpRecovery + "";
        // this.defLabel.string = playerFightProp.def + "";
        // this.atkLabel.string = playerFightProp.atk + "";
        // this.speedLabel.string = playerFightProp.speed + "";
        // this.gainRangeRateLabel.string = playerFightProp.gainRangeRate + "%";

        // 打开节点
        this.pauseNode.zIndex = 1000;
        this.pauseNode.active = true;


        // 游戏暂停
        cc.director.pause();
    }

    /**
     * 广告复活
     */
    public adRevive() {
        SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
            this.revive();
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
        })
    }

    /**
     * 复活
     */
    private revive() {
        if (this._canReviveCount <= 0) {
            return;
        }
        this._canReviveCount -= 1;

        // 通知恢复生命值
        // PlayerFightPropCtrl.getInstance().revive();

        this._gameOver = false;

        this.playerDieNode.active = false;

        // 复活玩家
        this.player.getComponent(PlayerCtrl).revive();

        // 游戏继续
        cc.director.resume();
    }

    /**
     * 展示结算界面
     */
    public showSettlement() {
        this.pauseNode.active = false;
        this.playerDieNode.active = false;

        // AudioManager.getInstance().playerAudio(AudioPathKey.OPEN_VIEW_AUDIO,false);

        // 渲染结算界面
        this.showReward("通关奖励", this._fightConfig.reward);

        // 暂停
        cc.director.pause();
    }


    /**
    * 接收玩家死亡通知
    */
    public playerDie() {
        this._gameOver = true;

        this.playerDieNode.active = true;
        this.playerDieNode.zIndex = 1000;

        if (this._canReviveCount == 0) {
            this.reviveButton.node.active = false;
        } else {
            let reviveCountTip = "复活(" + this._canReviveCount + ")";
            this.reviveButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = reviveCountTip;
        }

        // 暂停
        cc.director.pause();
    }


    /**
    * 继续战斗
    */
    public continueFight() {
        // AudioManager.getInstance().playerAudio(AudioPathKey.BOTTON_NAV_AUDIO,false);

        // 隐藏节点
        this._isPause = false;
        this.pauseNode.active = false;

        // 游戏继续
        cc.director.resume();
    }


    /**
     * 结束战斗
     */
    public closeFight() {
        // AudioManager.getInstance().playerAudio(AudioPathKey.BOTTON_NAV_AUDIO,false);

        // 返回主页面
        cc.director.loadScene(SceneKey.INDEX);

        this.node.destroy();

        // 游戏继续
        cc.director.resume();

        // AudioManager.getInstance().playerAudio(AudioPathKey.OPEN_VIEW_AUDIO,false);
    }

    /**
     * BOSS死亡
     */
    public bossDie() {
        this._gameOver = true;

        // 记录通关关卡
        PlayerCacheCtrl.getInstance().editPassFight(this._fightConfig.id);

        this.showSettlement();
    }











    // 玩家相关..............


    /**
     * 加载玩家技能列表
     */
    loadPlayerSkill() {
        // 获取玩家技能列表
        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfo();

        // 获取玩家战斗技能列表
        for (const skillId in playerSkillInfo) {
            let skillConfig = SkillConfig.getConfigById(Number(skillId));
            if (skillConfig == null || skillConfig.fightSkill == null) {
                continue;
            }


            let skillStr = skillConfig.fightSkill;
            let skillStrArr = skillStr.toString().split("_");;
            let skillType = skillStrArr[0];
            let skillLevel = Number(skillStrArr[1]);
            let bossSkillConfig: PlayerFightSkillBasic = PlayerFightSkillConfig.CONFIG[skillType];
            let skill: PlayerFightSkillLevelBasic = PlayerFightSkillConfig.getConfigByTypeAndLevel(skillType, skillLevel);

            let playerFightSkillInfo = {
                id: skill.id,
                type: skill.type,
                level: skill.level,
                num: skill.num,
                passNum: skill.passNum,
                durationTime: skill.durationTime,
                cdTime: skill.cdTime,
                atk: skill.atk,
                atkRange: skill.atkRange,
                lastAtkTime: 0,
                speed: skill.speed,
                intervalTime: skill.intervalTime,
                parentType: skill.parentType,
                atkIntervalTime: skill.atkIntervalTime,
                name: skill.name,
                desc: skill.desc,
                picRes: skill.picRes,
                sameAtkNum: skill.sameAtkNum,
                skillParam: skill.skillParam,
                followType: bossSkillConfig.followType,
                diffuse: skill.diffuse,
            }
            this._playerFightSkillInfo[skill.type + ""] = playerFightSkillInfo;
        }

    }
    /**
    * 获取需要生成的玩家技能信息
    * @returns 
    */
    public getGenPlayerFightSkill() {
        let genSkillList = [];
        for (const key in this._playerFightSkillInfo) {
            // 不是正常执行类型的不需要生成
            if (BossSkillConfig.EXEC_TYPE.NORMAL != BossSkillConfig.CONFIG[key].execType) {
                continue;
            }
            if (Object.prototype.hasOwnProperty.call(this._playerFightSkillInfo, key)) {
                let skillInfo = this._playerFightSkillInfo[key];
                if (skillInfo.lastAtkTime == 0 || skillInfo.lastAtkTime + skillInfo.cdTime < this._nowTime) {
                    skillInfo.lastAtkTime = this._nowTime;
                    genSkillList.push(skillInfo);
                }
            }
        }
        return genSkillList;
    }


    /**
     * 检查玩家技能释放
     */
    private checkPlayerSkill() {
        let skillList = this.getGenPlayerFightSkill();
        if (skillList.length > 0) {
            for (let i = 0; i < skillList.length; i++) {
                this.createPlayerSkill(skillList[i]);
            }
        }

    }

    // 创建玩家技能
    async createPlayerSkill(skillInfo: any) {
        // 生成数量
        let num = skillInfo.num;

        // 根据数量获取技能间隔
        let intervalTime = skillInfo.intervalTime;

        for (let i = 1; i <= num; i++) {
            this.scheduleOnce(() => {
                this.createPlayerSkillNode(skillInfo, i - 1);
            }, (i - 1) * intervalTime / 1000);
        }

    }

    /**
     * 创建玩家技能节点
     * @param skillInfo 技能信息
     * @param index 同一批技能中索引
     * @returns 
     */
    createPlayerSkillNode(skillInfo: any, index: number) {
        // 计算横向攻击方向与初始纵向距离
        let initXPos = 0;
        let initYPos = 0;
        let atkXDir = 1;
        let initAngle = 0;
        let rotation = 0;
        let dir = cc.v2(0, 1);
        let dirX = dir.x;
        let dirY = dir.y;
 
        let bulletCount = 1;
        let angleList = [0];
        if(skillInfo.diffuse != null && skillInfo.diffuse.status) {
            bulletCount = skillInfo.diffuse.num;
            angleList = skillInfo.diffuse.angle;
        }

        for (let i = 0; i < bulletCount; i++) {
            // 处理初始方向
            initAngle = angleList[i];
            dir = cc.v2(angleList[i],-1);
            dirX = dir.x;
            
            // 创建技能节点
            let skill: cc.Node = null;
            let script = PlayerFightBaseSkill;
            if (skillInfo.type == 1 || skillInfo.type == 2) { // 直线子弹
                script = PlayerSingleLineSkill;
                skill = cc.instantiate(this.playerSingleLinePrefab);
            }else if(skillInfo.type == 3) { // 无敌护盾
                script = PlayerFixSkill;
                skill = cc.instantiate(this.playerFixPrefab);

                // 更新玩家无敌时间
                this.player.getComponent(PlayerCtrl).updateNobeHitTime(new Date().getTime() + skillInfo.durationTime);
            }   

            // 技能是否跟踪怪物
            if (skillInfo.followType == PlayerFightSkillConfig.FOLLOW_TYPE.FOLLOW) {
                // 获取怪物位置的方向
                let bossPosition = this.boss.getChildByName("body").convertToNodeSpaceAR(this.node.position);
                let playerPosition = this.player.getChildByName("body").convertToNodeSpaceAR(this.node.position);
                let playerDir = MathUtil.getDir(bossPosition, playerPosition);
                if (playerDir.x != 0 || playerDir.y != 0) {
                    dir = playerDir;
                    dirX = playerDir.x;
                    dirY = playerDir.y;
                }
            }

            // 初始化技能属性
            let initSkillConfig = {
                atk: skillInfo.atk + this.player.getComponent(PlayerCtrl).playerInfo.atk,
                passNum: skillInfo.passNum,
                speed: skillInfo.speed,
                durationTime: skillInfo.durationTime,
                dir: dir,
                dirX: dirX,
                dirY: dirY,
                atkIntervalTime: skillInfo.atkIntervalTime,
                sameAtkNum: skillInfo.sameAtkNum,
                atkXDir: atkXDir,
                initAngle: initAngle
            }
            skill.getComponent(script).init(initSkillConfig);
            // 编辑技能节点大小与刚体大小
            skill.width = skillInfo.atkRange.w;
            skill.height = skillInfo.atkRange.h;
            // 刚体类型 1-BOX 2-Circle
            if (skillInfo.atkRange.type == 1) {
                skill.getComponent(cc.BoxCollider).size.width = skillInfo.atkRange.w;
                skill.getComponent(cc.BoxCollider).size.height = skillInfo.atkRange.h;
            } else if (skillInfo.atkRange.type == 2) {
                skill.getComponent(cc.CircleCollider).radius = skillInfo.atkRange.w / 2;
            } else {
                return;
            }
            // 初始位置为技能中心点位置
            let initPos: cc.Vec2 = cc.v2(0, 0);
            if (skillInfo.parentType == 1) {
                initPos = this.node.convertToNodeSpaceAR(this.player.convertToWorldSpaceAR(cc.Vec2.ZERO));
                this.node.addChild(skill);
            } else if (skillInfo.parentType == 2) {
                this.player.addChild(skill);
            } else {
                skill.destroy();
                return;
            }
            // XY轴位置预处理
            initPos.x += initXPos;
            initPos.y += initYPos;
            // 是否需要设置初始旋转角度
            // if(SkillConfig.ROTATION_TYPE.PLAYER_DIR == SkillConfig.CONFIG[skillInfo.type + ""].rotationType) {
            //     this.setRotaionByPlayerDir(skill,rotation);
            // } 

            skill.setPosition(initPos);
            skill.active = true;
        }
    }

    // boss相关..............


    /**
     * 加载boss
     */
    loadBoss() {
        this._bossConfig = BossConfig.getConfigById(this._fightConfig.bossId);
        if(this._bossConfig == null) {
            this.closeFight();
            return;
        }

        let bossCtrl: BossCtrl = this.boss.getComponent(BossCtrl);
        // 初始化BOSS属性
        bossCtrl.init(this._bossConfig);
        // 设置boss形状
        this.setSprite(this.boss.getChildByName("body").getComponent(cc.Sprite), this._bossConfig.uiPath);
        this.boss.getChildByName("body").width = this._bossConfig.width;
        this.boss.getChildByName("body").height = this._bossConfig.height;
        // 设置boss碰撞范围
        let bossCollider = this.boss.getChildByName("body").getComponent(cc.BoxCollider);
        bossCollider.size.width = this._bossConfig.width;
        bossCollider.size.height = this._bossConfig.height;

        // this.setAnimation(this.boss.getChildByName("body").getComponent(cc.Animation),this._bossConfig.animationPath,"walk");

        // 加载boss技能列表
        this.loadBossSkill();
    }

    async setSprite(container, name) {
        await SpriteManager.getInstance().setSpriteFrameByName(container, name);
    }

    // 设置动画并播放
    async setAnimation(ani, aniClipAddress, clipName) {
        // let animationClip = await AnimationManger.getInstance().getAnimationClipsByName(ani,aniClipAddress);
        // ani._clips = [];
        // ani.addClip(animationClip);
        // ani.play(clipName);
    }

    /**
     * 加载boss技能列表
     */
    loadBossSkill() {
        let skillList = this._bossConfig.skillList;
        if (skillList == null || skillList.length == 0) {
            return;
        }
        for (let i = 0; i < skillList.length; i++) {
            let skillConfig = skillList[i];
            let skillStr = skillConfig["skill"];
            let beginTime = skillConfig["beginTime"] == null ? 0 :Number(skillConfig["beginTime"]);
            let skillStrArr = skillStr.toString().split("_");;
            let skillType = skillStrArr[0];
            let skillLevel = Number(skillStrArr[1]);
            let bossSkillConfig: BossSkillBasic = BossSkillConfig.CONFIG[skillType];
            let skill: BossSkillLevelBasic = BossSkillConfig.getConfigByTypeAndLevel(skillType, skillLevel);

            let bossSkillInfo = {
                beginTime:beginTime,
                id: skill.id,
                type: skill.type,
                level: skill.level,
                num: skill.num,
                passNum: skill.passNum,
                durationTime: skill.durationTime,
                cdTime: skill.cdTime,
                atk: skill.atk,
                atkRange: skill.atkRange,
                lastAtkTime: 0,
                speed: skill.speed,
                intervalTime: skill.intervalTime,
                parentType: skill.parentType,
                atkIntervalTime: skill.atkIntervalTime,
                name: skill.name,
                desc: skill.desc,
                picRes: skill.picRes,
                sameAtkNum: skill.sameAtkNum,
                skillParam: skill.skillParam,
                followType: bossSkillConfig.followType,
                diffuse: skill.diffuse,
                prepareTime: skill.prepareTime
            }
            this._bossSkillInfo[skill.type + ""] = bossSkillInfo;
        }
    }


    /**
     * 获取需要生成的BOSS技能信息
     * @returns 
     */
    public getGenBossSkill() {
        let genSkillList = [];
        for (const key in this._bossSkillInfo) {
            // 不是正常执行类型的不需要生成
            if (BossSkillConfig.EXEC_TYPE.NORMAL != BossSkillConfig.CONFIG[key].execType) {
                continue;
            }
            if (Object.prototype.hasOwnProperty.call(this._bossSkillInfo, key)) {
                let skillInfo = this._bossSkillInfo[key];
                // 该技能未到开始释放时间
                if(this._roomTime - this._startFightTime < skillInfo.beginTime) {
                    continue;
                }

                if (skillInfo.lastAtkTime == 0 || skillInfo.lastAtkTime + skillInfo.cdTime < this._nowTime) {
                    skillInfo.lastAtkTime = this._nowTime;
                    genSkillList.push(skillInfo);
                }
            }
        }
        return genSkillList;
    }

    /**
     * 检查boss技能释放
     */
    private checkBossSkill() {
        let skillList = this.getGenBossSkill();
        if (skillList.length > 0) {
            for (let i = 0; i < skillList.length; i++) {
                this.createBossSkill(skillList[i]);
            }
        }
    }

    // 创建boss技能
    async createBossSkill(skillInfo: any) {
        // 生成数量
        let num = skillInfo.num;

        // 根据数量获取技能间隔
        let intervalTime = skillInfo.intervalTime;

        for (let i = 1; i <= num; i++) {
            this.scheduleOnce(() => {
                this.createBossSkillNode(skillInfo, i - 1);
            }, (i - 1) * intervalTime / 1000);
        }

    }

    /**
     * 创建boss技能节点
     * @param skillInfo 技能信息
     * @param index 同一批技能中索引
     * @returns 
     */
    createBossSkillNode(skillInfo: any, index: number) {
        // 计算横向攻击方向与初始纵向距离
        let initXPos = 0;
        let initYPos = 0;
        let atkXDir = 1;
        let initAngle = 0;
        let rotation = 0;
        let dir = cc.v2(0, -1);
        let dirX = dir.x;
        let dirY = dir.y;
        // 创建技能节点
        
        let bulletCount = 1;
        let dirXList = [0];
        let angleList = [0];
        if(skillInfo.diffuse != null && skillInfo.diffuse.status) {
            bulletCount = skillInfo.diffuse.num;
            dirXList = skillInfo.diffuse.dirX;
            angleList = skillInfo.diffuse.angleList;
        }

        for (let i = 0; i < bulletCount; i++) {
            // 处理初始方向
            dir = cc.v2(dirXList[i],-1);
            dirX = dir.x;
            
            let skill: cc.Node = null;
            let script = BossBaseSkill;
            if (skillInfo.type == 1 || skillInfo.type == 2 || skillInfo.type == 3) { // 直线子弹
                script = SingleLineSkill;
                skill = cc.instantiate(this.singleLinePrefab);
            }else if(skillInfo.type == 4) {
                script = DurationLineSkill;
                skill = cc.instantiate(this.durationLinePrefab);
            }

            // 技能是否跟踪玩家
            if (skillInfo.followType == BossSkillConfig.FOLLOW_TYPE.FOLLOW) {
                // 获取玩家位置的方向
                let bossPosition = this.boss.getChildByName("body").convertToNodeSpaceAR(this.node.position);
                let playerPosition = this.player.getChildByName("body").convertToNodeSpaceAR(this.node.position);
                let playerDir = MathUtil.getDir(playerPosition, bossPosition);
                if (playerDir.x != 0 || playerDir.y != 0) {
                    dir = playerDir;
                    dirX = playerDir.x;
                    dirY = playerDir.y;
                }
            }
    
            // 初始化技能属性
            let initSkillConfig = {
                atk: skillInfo.atk + this._bossConfig.atk,
                passNum: skillInfo.passNum,
                speed: skillInfo.speed,
                durationTime: skillInfo.durationTime,
                dir: dir,
                dirX: dirX,
                dirY: dirY,
                atkIntervalTime: skillInfo.atkIntervalTime,
                sameAtkNum: skillInfo.sameAtkNum,
                atkXDir: atkXDir,
                initAngle: initAngle,
                prepareTime: skillInfo.prepareTime
            }

            skill.getComponent(script).init(initSkillConfig);
            // 编辑技能节点大小与刚体大小
            skill.width = skillInfo.atkRange.w;
            skill.height = skillInfo.atkRange.h;
            // 刚体类型 1-BOX 2-Circle
            if (skillInfo.atkRange.type == 1) {
                skill.getComponent(cc.BoxCollider).size.width = skillInfo.atkRange.w;
                skill.getComponent(cc.BoxCollider).size.height = skillInfo.atkRange.h;
                if(skillInfo.atkRange.offsetY) {
                    skill.getComponent(cc.BoxCollider).offset.y = skillInfo.atkRange.offsetY;
                }
            } else if (skillInfo.atkRange.type == 2) {
                skill.getComponent(cc.CircleCollider).radius = skillInfo.atkRange.w / 2;
            } else {
                return;
            }

            // 初始位置为技能中心点位置
            let initPos: cc.Vec2 = cc.v2(0, 0);
            if (skillInfo.parentType == 1) {
                initPos = this.node.convertToNodeSpaceAR(this.boss.getChildByName("body").convertToWorldSpaceAR(cc.Vec2.ZERO));
                this.node.addChild(skill);
            } else if (skillInfo.parentType == 2) {
                this.boss.addChild(skill);
            } else {
                skill.destroy();
                return;
            }

            // XY轴位置预处理
            initPos.x += initXPos;
            initPos.y += initYPos;

            this.setSkillAngle(skill, angleList[i], initXPos, initYPos);
    
            skill.setPosition(initPos);
            skill.active = true;
        }

    }


    
     /**
      * 设置技能角度
      * @param skill 技能节点
      * @param initAngle 最终加上角度
      */
      setSkillAngle(skill,initAngle,x,y) {
        
        var r: number = Math.atan2(x,y); // 角度
        var degree: number = r * 180 / Math.PI;

        // degree = 360 - degree;
        degree = degree - (-90);

        skill.angle = degree + initAngle;
    }


    // 通用

    /**
     * 奖励弹窗
     * @param showTitle 弹窗标题
     * @param itemList 奖励物品列表
     */
    public showReward(title: string, itemList: any) {
        this.settlementNode.zIndex = 1000;
        let titleLabel: cc.Label = this.settlementNode.getChildByName("settlementView").getChildByName("title").getComponent(cc.Label);
        titleLabel.string = title;

        let contentNode: cc.Node = this.settlementNode.getChildByName("settlementView").getChildByName("itemPageView").getChildByName("view").getChildByName("content");
        contentNode.removeAllChildren();

        for (let i = 0; i < itemList.length; i++) {
            let itemInfo = itemList[i];
            let itemId = itemInfo.itemId;
            let itemCount = itemInfo.itemCount;
            let itemConfig: ItemBasic = ItemConfig.getConfigById(itemId);

            let item = cc.instantiate(this.itemPrefab);
            // 物品图片
            let itemPic: cc.Sprite = item.getChildByName("pic").getComponent(cc.Sprite);
            SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic, itemConfig.srcPath);

            let itemCountLabel: cc.Label = item.getChildByName("itemCount").getComponent(cc.Label);
            itemCountLabel.string = "" + itemCount;

            // 添加到内容节点，并启用
            contentNode.addChild(item);
            item.active = true;
        }

        let button: cc.Button = this.settlementNode.getChildByName("settlementView").getChildByName("confirmButton").getComponent(cc.Button);

        ButtonUtil._setEvent(this.node, button, "FightCtrl", "confirmReward", "1");
        let adButton: cc.Button = this.settlementNode.getChildByName("settlementView").getChildByName("adButton").getComponent(cc.Button);

        ButtonUtil._setEvent(this.node, adButton, "FightCtrl", "adReward", "1");

        this.settlementNode.active = true;
    }

    /** 
     * 广告奖励
    */
    public adReward(event, customEventData) {
        SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
            this.sendRes(true);
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
        })
    }

    /** 
     * 确认通关奖励
    */
    public confirmReward(event, customEventData) {
        // 发放奖励
        this.sendRes(false);
    }

    /**
     * 
     * @param isAd 是否广告翻倍
     */
    public sendRes(isAd) {
        let itemList = this._fightConfig.reward;
        if(itemList != null && itemList.length > 0) {
            if(isAd) {
                for (let i = 0; i < itemList.length; i++) {
                    let item = itemList[i];
                    item.itemCount *= 2;
                    itemList[i] = item;
                }
            }
            PlayerCacheCtrl.getInstance().addPlayerItemList(itemList);
        }



        // 结束
        this.closeFight();
    }
}
