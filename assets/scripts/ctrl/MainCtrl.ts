import GlobalCtrl from "./GlobalCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import AttrLevelConfig, { AttrLevelBasic } from "../config/AttrLevelConfig";
import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import MonsterCtrl from "./MonsterCtrl";
import GeneralConfig, { GeneralBasic } from "../config/GeneralConfig";
import TipCtrl from "./TipCtrl";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import ChapterConfig, { ChapterBasic } from "../config/ChapterConfig";
import MonsterConfig, { MonsterBasic } from "../config/MonsterConfig";
import GeneralSkillConfig, { GeneralSkillBasic } from "../config/GeneralSkillConfig";
import GeneralInitSkill from "./generalSkill/GeneralInitSkill";
import ItemPicCtrl from "./res/ItemPicCtrl";
import AttrLevelCtrl from "./AttrLevelCtrl";
import SpineUtil from "../utils/SpineUtil";
import ResPathKey from "../config/ResPathKey";
import SkillConfig, { SkillBasic, SkillLevelBasic } from "../config/SkillConfig";
import MainSkillCtrl from "./generalSkill/MainSkillCtrl";
import SpriteManager from "../manager/SpriteManager";
import UnlockManager from "../manager/UnlockManager";
import PetConfig from "../config/PetConfig";
import MainPetCtrl from "./pet/MainPetCtrl";
import AudioManager from "../manager/AudioManager";
import TxtUtil from "../utils/TxtUtil";
import SdkCtrl from "../utils/WxSdkUtil";
import { ItemInfo } from "../entity/ItemInfo";
import AdBoxCtrl from "./AdBoxCtrl";
import DateUtil from "../utils/DateUtil";
import ChallengeConfig, { ChallengeBasic, ChallengeLevelBasic } from "../config/ChallengeConfig";
import ChallengeCtrl from "./ChallengeCtrl";
import ActivityCtrl from "./ActivityCtrl";
import ActivityConfig from "../config/ActivityConfig";
import TaskConfig from "../config/TaskConfig";
import CdkConfig, { CdkBasic } from "../config/CdkConfig";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCtrl extends cc.Component {


    @property({ type: cc.Node, tooltip: '属性信息列表' })
    attrContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '属性信息预制体' })
    attrInfoPrefab: cc.Prefab = null;

    @property({ type: cc.Label, tooltip: '章节名称' })
    chapterName: cc.Label = null;

    @property({ type: cc.Node, tooltip: "气流" })
    qiliu: cc.Node = null;

    @property({ type: cc.Node, tooltip: "BOSS结束提示" })
    bossEnd: cc.Node = null;

    @property({ type: cc.Node, tooltip: "BOSS来袭提示" })
    bossComing: cc.Node = null;

    @property({ type: cc.Node, tooltip: 'boss来袭左边人物' })
    bossComingLeftNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: 'boss来袭右边怪物' })
    bossComingRightNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "战斗背景1" })
    fightBg1: cc.Node = null;

    @property({ type: cc.Node, tooltip: "战斗背景2" })
    fightBg2: cc.Node = null;

    @property({ type: cc.ProgressBar, tooltip: '章节进度条' })
    chapterProgress: cc.ProgressBar = null;

    // @property({ type: cc.Button, tooltip: 'BOSS按钮' })
    // bossButton: cc.Button = null;

    @property({ type: cc.Node, tooltip: '战斗区域' })
    battlegroundNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '战斗区域-左边' })
    battlegroundLeftNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '战斗区域-右边' })
    battlegroundRightNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '怪物预制体' })
    monsterPrefab: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: '角色初始技能预制体' })
    generalInitSkillPrefab: cc.Prefab = null;

    @property({ type: cc.Node, tooltip: '角色节点' })
    generalNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '升级光效节点' })
    levelUpSpineNode:cc.Node = null;

    @property({ type: cc.Node, tooltip: '金币资源节点' })
    goldResNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '钻石资源节点' })
    diamondResNode: cc.Node = null;

    @property({ type: cc.Label, tooltip: '金币资源数量' })
    goldResNumLabel: cc.Label = null;

    @property({ type: cc.Label, tooltip: '钻石资源数量' })
    diamondResNumLabel: cc.Label = null;

    @property({ type: cc.Prefab, tooltip: '资源图片预制体' })
    itemPicPrefab: cc.Prefab = null;

    @property({ type: cc.Label, tooltip: '总战力' })
    totalPower: cc.Label = null;

    @property({ type: cc.Node, tooltip: '装备技能的内容节点' })
    mainSkillContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '装备技能预制体' })
    mainSkillPrefab: cc.Prefab = null;

    @property({ type: cc.Node, tooltip: '装备宠物的内容节点' })
    mainPetContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '装备宠物预制体' })
    mainPetPrefab: cc.Prefab = null;

    @property({ type: cc.Button, tooltip: '自动技能开关按钮' })
    autoSkillButton: cc.Button = null;

    @property({ type: cc.Node, tooltip: '广告箱节点' })
    adBoxNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '广告箱信息节点' })
    adBoxInfoNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '副本通关奖励' })
    challengeRewardNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: '设置界面节点' })
    settingNode: cc.Node = null;


    /**
     * 玩家血条
     */
    private generalBloodProgressBarSprite:cc.Sprite = null;

    /**
     * 房间时间
     */
    private _currTime: number = 0;

    /**
     * 上次生成怪物时间
     */
    private _lastGenMonsterTime: number = 0;

    /**
     * 章节配置
     */
    private _chapterConfig: ChapterBasic = null;

    /**
     * 玩家章节信息
     */
    private _playerChapterInfo = null;

    /**
     * 是否为副本挑战
     */
    private _isChallenge = false;

    /**
     * 副本挑战奖励
     */
    private _challengeReward = null;

    /**
     * 副本怪物批次
     */
    private _challengeMonsterBatch = null;
    
    /**
     * 副本配置
     */
    private _challengeConfig:ChallengeBasic = null;
    
    /**
     * 副本等级配置
     */
    private _challengeLevelConfig:ChallengeLevelBasic = null;

    /**
     * 需要生成的怪物
     */
    private _needGenMonsterList = [];

    /**
     * 角色spine动画组件
     */
    private _generalSpSkeleton: sp.Skeleton = null;

    /**
     * 角色的初始技能
     */
    private _generalInitSkill: GeneralSkillBasic = null;

    /**
     * 怪物信息
     */
    public _monsterList = [];

    /**
     * 角色配置
     */
    public _generalConfig = null;

    /**
     * 怪物生成序列
     */
    private _monsterGenId = 1;

    /**
     * 属性对象池
     */
    private _attrLevelNodeList: Array<cc.Node> = [];


    /**
     * 金币对象池
     */
    private _itemPicNodeList: Array<cc.Node> = [];
    /**
     * 怪物对象池
     */
    private _monsterNodeList: Array<cc.Node> = [];

    /**
     * boss来袭主角 Spine
     */
    private _bossComingGeneralSpine: sp.SkeletonData = null;

    /**
     * boss来袭boss Spine
     */
    private _bossComingBossSpine: sp.SkeletonData = null;

    /**
     * 装备的技能信息列表
     */
    private _mainSkillInfoList = [];
    /**
     * 装备的宠物信息列表
     */
    private _mainPetInfoList = [];

    /**
     * 角色信息
     */
    private _generalInfo = {
        currHp: 0, // 当前生命
        genInitSkillIntervalTime: 1000, // 生成初始节能功能的间隔时间
        lastGenInitSkillTime: 0, // 上一次生成初始技能时间
        lastHpRestoreTime: 0, // 上一次生命恢复时间
    };

    /**
     * 角色是否存活
     */
    public generalIsAlive = true;

    /**
     * 战斗设置
     */
    private FIGHT_SETTING = {
        START_FIGHT_TIME: 2000, // 战斗开始时间
        GEN_MONSTER_INTERVAL_TIME: 250, // 怪物生成间隔时间
    }

    /**
     * 角色状态
     */
    private GENERAL_STATUS = {
        INIT: 0, // 初始化
        NORAML: 1, // 正常
    }

    /**
     * 战斗状态
     */
    private FIGHT_STATUS = {
        INIT: 0, // 初始化
        READY: 1, // 准备完毕
        NORAML: 2, // 正常
        FINISH: 3, // 结束
        BG_RUN: 4, // 跑图
        WATING_RESET:5 // 等待重置
    }

    /**
     * 跑图时间
     */
    private BG_RUN_TIME = 2
    /**
     * 副本跑图时间 0.75秒  
     */
    private CHALLENGE_BG_RUN_TIME = 0.75

    /**
     * 开始跑图时间
     */
    private _startBgRunTime = 0;

    /**
     * 是否可以释放技能
     */
    public canExecSkill: boolean = false;

    /**
     * 展示升级特效时间
     */
    private _showLevelUpNodeTime:number = 0;

    /**
     * 上一次检查广告箱是否出现时间
     */
    private _lastCheckAdBoxTime:number = 0;


    /**
     * 战斗信息
     */
    private _fightInfo = {
        generalId: null, // 角色ID
        generalStatus: this.GENERAL_STATUS.INIT, // 初始化
        status: this.FIGHT_STATUS.INIT, // 初始化
        isBoss: false, // 是否为boss
    }

    /**
     * 资源物体的初始位置,同时也是控制生成数量
     */
    private _itemPicPosList = [[0, 0], [-25, -25], [0, 25], [25, 0]]

    /**
     * 章节进度条填充数
     */
    private _chapterProgressBarFillRange = [0, 0.33, 0.575, 0.825, 1];
    /**
     * 章节进度条指示位移数
     */
    private _chapterProgressPointX = [-85, -34, 15, 63, 110];

    onLoad() {
        GlobalCtrl.getInstance();
    }

    start() {
    }

    onEnable() {
        this.initAudio();
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 初始化一些节点
        this.initNode();

        // 初始化Spine动画
        this.initSpine();

        // 获取角色技能列表
        this._loadMainSkillList();

        // 获取角色宠物列表
        this._loadMainPetList();

        // 初始化属性列表
        this.initAttrList();

        // 重置战斗
        this.fightOverEvent(true);
    }

    /**
     * 初始化一些节点，方便后续直接操作
     */
    private initNode() {
        this.generalBloodProgressBarSprite = this.generalNode.getChildByName("blood").getChildByName("bar").getComponent(cc.Sprite);
    }

    /**
     * 初始化spine动画
     */
    async initSpine() {
        // 加载气流动画
        let qiliuSpSkeleton: sp.Skeleton = this.qiliu.getComponent(sp.Skeleton);
        qiliuSpSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(ResPathKey.SPINE_QILIU)

        // 加载boss来袭动画
        let bossComingSpSkeleton: sp.Skeleton = this.bossComing.getComponent(sp.Skeleton);
        bossComingSpSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(ResPathKey.SPINE_BOSS_COMING)

        // 加载主角动画
        bossComingSpSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(ResPathKey.SPINE_BOSS_COMING)

        // 加载boss动画
        qiliuSpSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(ResPathKey.SPINE_QILIU)
    }

    /**
     * 初始化属性列表
     */
    initAttrList() {
        // 清空属性栏目
        this.attrContentNode.removeAllChildren();

        for (const attrKey in AttrLevelConfig.CONFIG) {
            let attrLevelConfig: AttrLevelBasic = AttrLevelConfig.getConfigById(attrKey);
            if (!attrLevelConfig.isShow) {
                continue;
            }

            this.initAttr(attrLevelConfig);
        }
    }

    /**
     * 初始化属性信息
     */
    initAttr(attrLevelConfig: AttrLevelBasic) {
        // 初始化属性信息节点
        let attrInfo = cc.instantiate(this.attrInfoPrefab);
        attrInfo.getComponent(AttrLevelCtrl).init(this.node, attrLevelConfig);
        this.attrContentNode.addChild(attrInfo, 1, attrLevelConfig.attrKey);
        this._attrLevelNodeList.push(attrInfo);
    }

    /**
     * 属性升级事件
     */
    public attrLevelUpEvent() {
        // 玩家升级特效 - 0.5秒，覆盖式
        this._showLevelUpNodeTime = this._currTime + 500;
        this.loadGeneralAttr();
        this.flushInfo();
    }


    update(dt) {
        this._currTime += (dt * 1000);

        // 处理升级特效的显示隐藏
        if(this._showLevelUpNodeTime > this._currTime) {
            if(!this.levelUpSpineNode.active) {
                this.levelUpSpineNode.active = true;
            }
        }else {
            if(this.levelUpSpineNode.active) {
                this.levelUpSpineNode.active = false;
            }
        }

        // 检查广告箱是否可以出现了
        this.checkAdBox();

        // 角色未准备好
        if (this._fightInfo.generalStatus != this.GENERAL_STATUS.NORAML) {
            this.generalMoveToFightPos();
            return;
        }

        // 未到开始战斗时间
        if (this._currTime < this.FIGHT_SETTING.START_FIGHT_TIME) {
            return;
        }

        // 战斗中
        if (this.FIGHT_STATUS.NORAML == this._fightInfo.status) {
            // 角色死亡
            if (!this.generalIsAlive) {
                return;
            }

            // 加载怪物
            this._genMonster();

            // 检查怪物是否都死亡
            this._checkMonsterAllDie();

            // 检查角色发起攻击
            this._checkGeneralAtk();

            // 生成角色生命恢复
            this._checkGeneralHpRestore();
        }

        // 战斗结束 
        if (this.FIGHT_STATUS.FINISH == this._fightInfo.status) {
            if(this._isChallenge) { // 副本
                this.challengeFightFinish();
            }else { // 正常关卡
                this.fightFinish();
            }
        }

        // 跑图
        if (this.FIGHT_STATUS.BG_RUN == this._fightInfo.status) {
            this._bgRun(dt);
        }

    }

    /**
     * 检查广告箱
     */
    private checkAdBox() {
        // 一秒间隔
        if(this._lastCheckAdBoxTime + 1000 > this._currTime) {
            return;
        }

        let nowTime = new Date().getTime();
        let playerAdBoxInfo = PlayerCacheCtrl.getInstance().getPlayerAdBoxInfo();
        let adBoxConfig = ChapterConfig.AD_BOX_CONFIG;
        // 间隔时间内 / 每日可领取数量上限 则不处理
        if(playerAdBoxInfo.lastShowTime + adBoxConfig.intervalTime >= nowTime || playerAdBoxInfo.receiveCount >= adBoxConfig.dailyCount) {
            return;
        }

        // 可以出现了
        this.adBoxNode.getComponent(AdBoxCtrl).startFly();

        playerAdBoxInfo.lastShowTime = nowTime;
        PlayerCacheCtrl.getInstance().setPlayerAdBoxInfo(playerAdBoxInfo);
    }

    /**
     * 展示广告箱界面
     */
    public showAdBoxInfo() {
        AudioManager.getInstance().playCommonBtn();
        // 隐藏广告箱节点
        this.adBoxNode.active = false;

        let view:cc.Node = this.adBoxInfoNode.getChildByName("view");
        let adBoxConfig = ChapterConfig.AD_BOX_CONFIG;

        let itemConfig:ItemBasic = ItemConfig.getConfigById(adBoxConfig.itemId);
        SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("reward").getChildByName("pic").getComponent(cc.Sprite), itemConfig.srcPath);
        let itemInfo:ItemInfo = ChapterConfig.getAdBoxReward(PlayerCacheCtrl.getInstance().getPlayerChapterInfo().chapterId);
        view.getChildByName("reward").getChildByName("itemCount").getComponent(cc.Label).string = itemInfo.itemCount + "";

        this.adBoxInfoNode.active = true;
    }

    /**
     * 关闭广告箱界面
     */
    public closeAdBoxInfo() {
        AudioManager.getInstance().playCommonBtn();
        this.adBoxInfoNode.active = false;
    }

    /**
     * 领取广告箱
     */
    public receiveAdBox() { 
        SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
            let itemInfo:ItemInfo = ChapterConfig.getAdBoxReward(PlayerCacheCtrl.getInstance().getPlayerChapterInfo().chapterId);
            AudioManager.getInstance().playGainReward();
            PlayerCacheCtrl.getInstance().addPlayerItemList([itemInfo]);

            // 记录广告箱信息
            let playerAdBoxInfo = PlayerCacheCtrl.getInstance().getPlayerAdBoxInfo();
            if(playerAdBoxInfo.lastReceiveTime < DateUtil.getTodayStartTime()) { // 当天第一次
                playerAdBoxInfo.receiveCount = 1;
            }else {
                playerAdBoxInfo.receiveCount += 1;
            }
            playerAdBoxInfo.lastReceiveTime = new Date().getTime();
            PlayerCacheCtrl.getInstance().setPlayerAdBoxInfo(playerAdBoxInfo);

            this.flushInfo();
            // 关闭广告箱界面
            this.closeAdBoxInfo();
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
        })
    }

    /**
     * 重置战斗
     * @param resetPlayer 重置玩家信息
     * @param challengeChapterId 副本关卡
     */
    resetFight(resetPlayer: boolean = true,challengeChapterId:number=null) {
        // 清理战斗场景
        this._fightInfo.status = this.FIGHT_STATUS.INIT;
        this._generalInfo.lastGenInitSkillTime = 0; // 重置生成初始技能时间
        this._monsterGenId = 1; // 重置怪物ID序列
        this._monsterList = []; // 怪物列表清空
        this._needGenMonsterList = []; // 需要生成怪物列表清空
        this.battlegroundLeftNode.removeAllChildren(); // 清楚所有与角色相关的节点 如：角色初始技能
        this.battlegroundRightNode.removeAllChildren(); // 清除所有怪物节点

        // 加载章节信息
        this._loadChapter(challengeChapterId);

        // 加载怪物信息
        this._loadMonster();

        // 加载玩家信息(玩家、宠物、技能)
        if (resetPlayer) {
            this._loadPlayer();
        }

        // 重置章节进度
        this._loadChapterProgress(false);

        // 隐藏提示文本
        if (this.bossComing.active) {
            this.bossComing.active = false;
        }

        // 准备完毕
        this._fightInfo.status = this.FIGHT_STATUS.NORAML;

        // 可以释放技能了
        this.canExecSkill = true;
    }

    /**
     * 加载章节信息
     * @param challengeChapterId 副本关卡ID
     */
    private _loadChapter(challengeChapterId:number) {
        let playerChapterInfo = PlayerCacheCtrl.getInstance().getPlayerChapterInfo(); // 玩家章节信息

        // 是否有副本关卡
        let chapterConfig: ChapterBasic = null;
        if(challengeChapterId) {
            chapterConfig = ChapterConfig.getConfigById(challengeChapterId); // 章节配置
        }else {
            chapterConfig = ChapterConfig.getConfigById(playerChapterInfo.chapterId); // 章节配置
        }

        this._chapterConfig = chapterConfig;
        this._playerChapterInfo = playerChapterInfo;
        this._isChallenge = challengeChapterId != null;

        // 渲染章节名称
        let chapterName = this._chapterConfig.name;
        if(this._isChallenge) { // 副本渲染进度
            chapterName = (this._challengeMonsterBatch + 1) + "/" + this._chapterConfig.monsterBatch.length;
        }
        this.chapterName.string = chapterName;
    }

    /**
    * 加载怪物信息
    */
    private _loadMonster() {
        let monsterIdList = null;

        if(this._isChallenge) { // 副本
            monsterIdList = this._chapterConfig.monsterBatch[this._challengeMonsterBatch];
        }else {
            if (this._playerChapterInfo.batch < this._chapterConfig.monsterBatch.length) { // 小怪
                this._fightInfo.isBoss = false;
                monsterIdList = this._chapterConfig.monsterBatch[this._playerChapterInfo.batch];
            } else { // boss
                this._fightInfo.isBoss = true;
                monsterIdList = this._chapterConfig.boss;
            }
        }


        for (let i = 0; i < monsterIdList.length; i++) {
            let monsterId = monsterIdList[i];
            let mosnterConfig: MonsterBasic = MonsterConfig.getConfigById(monsterId);
            this._needGenMonsterList.push(mosnterConfig);
        }
    }

    /**
     * 章节进度条
     * @param bossChapter 是否为BOSS关卡
     */
    private _loadChapterProgress(bossChapter: boolean) {
        if (this._isChallenge) {
            this.chapterProgress.node.active = false;
            return;
        }


        if (bossChapter) {
            // this.bossButton.node.active = true;
            this.chapterProgress.node.active = false;
        } else {
            let barSprite: cc.Sprite = this.chapterProgress.node.getChildByName("bar").getComponent(cc.Sprite);
            barSprite.fillRange = this._chapterProgressBarFillRange[this._playerChapterInfo.batch];
            // 指示点位移
            this.chapterProgress.node.getChildByName("point").x = this._chapterProgressPointX[this._playerChapterInfo.batch];
            this.chapterProgress.node.active = true;
            // this.bossButton.node.active = false;
        }
    }

    /**
     * 加载玩家
     */
    private _loadPlayer() {
        // 获取玩家使用的角色
        this._fightInfo.generalId = PlayerCacheCtrl.getInstance().getPlayerUseGeneral();

        this._loadGeneral();

        // 获取玩家装备

        // 获取玩家宠物

        // 获取玩家是否开启自动释放技能

    }

    /**
     * 生成怪物
     */
    private _genMonster() {
        if (this._lastGenMonsterTime + this.FIGHT_SETTING.GEN_MONSTER_INTERVAL_TIME >= this._currTime) {
            return;
        }

        if (this._needGenMonsterList.length <= 0) {
            return;
        }

        let monsterConfig = this._needGenMonsterList.pop();

        // 从怪物对象池获取
        let monster = cc.instantiate(this.monsterPrefab);
        this.battlegroundRightNode.addChild(monster);
        // 设置怪物的大小
        monster.getComponent(MonsterCtrl).init(monsterConfig, this._fightInfo.isBoss ? cc.v2(0, 0) : MonsterConfig.getRandomPosition(), this.generalNode, this._monsterGenId, this._chapterConfig.monsterBaseAttrAddRate, this._chapterConfig.monsterSpecialAttrAddRate);
        
        this._monsterList.push({
            monsterId: this._monsterGenId,
            node: monster
        });

        this._monsterGenId += 1;
        this._lastGenMonsterTime = this._currTime;
    }

    /**
     * 检查怪物是否都死亡
     */
    private _checkMonsterAllDie() {
        // 需要生成的怪物数量
        let needGenMonsterCount = this._needGenMonsterList.length;
        let aliveMonsterCount = this._monsterList.length;

        // 如果都没有就是结束了
        if (needGenMonsterCount + aliveMonsterCount == 0) {
            this._fightInfo.status = this.FIGHT_STATUS.FINISH;
        }
    }

    /**
     * 检查角色生命恢复
     */
    private _checkGeneralHpRestore() {
        if (this._generalInfo.lastHpRestoreTime + 1000 > this._currTime) {
            return;
        }

        // 恢复生命
        let hpRestore = this._generalConfig.hpRestore;
        if (this._generalInfo.currHp + hpRestore > this._generalConfig.hp) {
            // 超出上限处理
            hpRestore = this._generalConfig.hp - this._generalInfo.currHp;
        }

        if (hpRestore > 0) {
            this._generalInfo.currHp += hpRestore;
            this._resetGeneralBlood();
        }

        this._generalInfo.lastHpRestoreTime = this._currTime;
    }

    /**
    * 生成角色初始技能
    */
    private _checkGeneralAtk() {
        // 是否到时间了
        if (this._generalInfo.lastGenInitSkillTime + this._generalInfo.genInitSkillIntervalTime > this._currTime) {
            return;
        }

        // 是否有怪物
        if (this._monsterList.length == 0) {
            return;
        }

        // 播放攻击动画
        this._playerGeneralAnimation(null, GeneralConfig.SPINE_ANIMATION_NAME.ATK, false, false);

        // 重置生成初始技能时间
        this._generalInfo.lastGenInitSkillTime = this._currTime;
    }

    /**
    * 生成角色初始技能
    */
    private _genGeneralInitSkill() {
        if(this._monsterList.length == 0) {
            return;
        }
        
        AudioManager.getInstance().playGeneralAtk();

        // 第一只怪物的节点信息
        let monsterNode = this._monsterList[0].node;

        // 生成
        let generalInitSkill = cc.instantiate(this.generalInitSkillPrefab);
        let skill = generalInitSkill.addComponent(GeneralInitSkill);
        skill.init(this._generalInitSkill, monsterNode, this._generalConfig, this.node.getComponent(MainCtrl));

        // 添加进战斗区域
        this.battlegroundLeftNode.addChild(generalInitSkill);
    }

    /**
     * 怪物ID
     * @param monsterId 怪物ID 
     */
    monsterDie(monsterId) {
        if (this._monsterList.length == 0) {
            return;
        }

        for (let i = 0; i < this._monsterList.length; i++) {
            if (this._monsterList[i].monsterId == monsterId) {
                let monsterNode = this._monsterList[i].node;
                // 转为当前节点位置
                let possitionByThisNode = this.node.convertToNodeSpaceAR(monsterNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
                // 计算掉落
                this._calcReward(possitionByThisNode.x, possitionByThisNode.y);

                this._monsterList.splice(i, 1); // 移除

                // 统计击杀怪物数量
                PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL, 1);

                return;
            }
        }
    }


    /**
     * 处理怪物死亡掉落奖励
     * @param initPosX 初始位置X
     * @param initPosY 初始位置Y
     */
    async _calcReward(initPosX: number, initPosY: number) {
        // 副本中不计算奖励
        if(this._isChallenge) {
            return;
        }

        let itemList = this._chapterConfig.reward;
        if (!itemList || itemList.length == 0) {
            return;
        }

        // todo.. 此处只取出一个，.reward结构为集合先不变，方便后续扩展
        let item = itemList[0];
        let itemCount = item.itemCount;
        // boss * 4
        if(this._fightInfo.isBoss) {
            itemCount *= 4;
        }

        let itemConfig: ItemBasic = ItemConfig.getConfigById(item.itemId);
        if (itemConfig) {
            PlayerCacheCtrl.getInstance().addPlayerItem(item.itemId, itemCount);
            this.showReward(itemConfig,itemCount, initPosX, initPosY, 1);
        }
    }

    /**
     * 展示奖励
     * @param itemConfig 物品配置
     * @param initPosX 初始X位置
     * @param initPosY 初始Y位置
     * @param itemCount 物品数量
     * @param targetType 目标类型 1-金币节点 2-钻石节点
     */
    public showReward(itemConfig:ItemBasic,itemCount:number, initPosX:number,initPosY:number, targetType) {
        this.flushInfo();
        for (let i = 0; i < this._itemPicPosList.length; i++) {
            this.scheduleOnce(() => {
                let itemPic = this._itemPicNodeList.pop();
                if (!itemPic) {
                    // 对象池没有，创建一个
                    itemPic = cc.instantiate(this.itemPicPrefab);
                    this.node.addChild(itemPic);
                }
    
                let x = initPosX + this._itemPicPosList[i][0];
                let y = initPosY + this._itemPicPosList[i][1];
                let targetNode = targetType == 1 ? this.goldResNode : this.diamondResNode;
                itemPic.getComponent(ItemPicCtrl).init(this.node, itemConfig, itemCount, x, y, targetNode);
            },0.2);
        }
    }

    /**
     * 刷新信息
     */
    public flushInfo() {
        // 重新渲染金币数量
        this.goldResNumLabel.string = TxtUtil.parseTxt(PlayerCacheCtrl.getInstance().getPlayerGoldNum() + "");
        
        // 重新渲染钻石数量
        this.diamondResNumLabel.string = TxtUtil.parseTxt(PlayerCacheCtrl.getInstance().getPlayerDiamondNum() + "");
    }

    /**
     * 回收资源节点
     * @param node 回收节点
     */
    public itemPicNodeRecovery(node: cc.Node) {
        this._itemPicNodeList.push(node);
    }

    /**
     * 副本战斗结束
     */
    challengeFightFinish() {
        this._fightInfo.status = this.FIGHT_STATUS.WATING_RESET;
        if (this.generalIsAlive) { // 通关
            // 是否最后一个批次了
            if(this._challengeMonsterBatch == this._chapterConfig.monsterBatch.length - 1) {
                TipCtrl.getInstance().tipWithColor(this.node,"挑战成功","#ffffff");
                // 发放奖励
                AudioManager.getInstance().playGainReward();
                PlayerCacheCtrl.getInstance().addPlayerItem(this._challengeReward.itemId,this._challengeReward.itemCount);

                // 记录副本次数
                this.calcChallengeCount();

                this.showCallengeRewardNode();
                
                this.flushInfo();

                // 副本难度升级
                let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(this._challengeConfig.id);
                // 副本难度为玩家副本的最高难度并且有下一个难度时需要解锁下一难度
                if(this._challengeLevelConfig.level == playerChallengeInfo.level && playerChallengeInfo.level < this._challengeConfig.levelConfig.length) {
                    playerChallengeInfo.level += 1;
                    PlayerCacheCtrl.getInstance().setPlayerChallengeInfo(this._challengeConfig.id, playerChallengeInfo);
                }
                // 通知副本结束
                this.notifyChallengeOver();
                // 重置正常战斗
                this.fightOverEvent(true, null);
            }else { // 继续下一副本批次，跑图
                // 跑图状态
                this._fightInfo.status = this.FIGHT_STATUS.BG_RUN;
                this._startBgRunTime = this._currTime;
                this.canExecSkill = false;
                this._playerGeneralAnimation(null, GeneralConfig.SPINE_ANIMATION_NAME.RUN, true, false);
                this.battlegroundRightNode.removeAllChildren(); // 清除所有怪物节点
                SpineUtil.getInstance().playSpineAni(this.qiliu.getComponent(sp.Skeleton), null, "start", true, false); // 播放气流
                this._challengeMonsterBatch += 1;
            }
        }else {
            // 死了
            TipCtrl.getInstance().tipWithColor(this.node,"挑战失败","#ffffff");
            // 通知副本结束
            this.notifyChallengeOver();
            // 重置为正常战斗
            this.fightOverEvent(true,null);
        }
    }

    /**
     * 统计副本次数
     */
    private calcChallengeCount() {
        if(this._challengeConfig.id == ChallengeConfig.CALL_FUNCTION.GOLD) {
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.GOLD_CHALLENGE, 1);
        }else if(this._challengeConfig.id == ChallengeConfig.CALL_FUNCTION.DIAMOND) {
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.DIAMOND_CHALLENGE, 1);
        }else if(this._challengeConfig.id == ChallengeConfig.CALL_FUNCTION.GENERAL_EXP) {
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.GENERAL_EXP_CHALLENGE, 1);
        }
    }

    /**
     * 通知副本结束
     */
    private notifyChallengeOver() {
        // 通知恢复
        this.node.parent.getChildByName("middle").getChildByName("challenge").getComponent(ChallengeCtrl).challengeOver();

    }

    /**
     * 战斗结束
     */
    fightFinish() {
        this._fightInfo.status = this.FIGHT_STATUS.WATING_RESET;

        // 结算操作
        if (this.generalIsAlive) { // 通关

            let hasNextChapter: boolean = ChapterConfig.hasNextChapter(this._playerChapterInfo.chapterId); // 是否有下一章节

            if (!this._fightInfo.isBoss) { // 非boss批次
                this._playerChapterInfo.batch = this._playerChapterInfo.batch + 1; // 章节怪物批次提升
                // 记录数据
                PlayerCacheCtrl.getInstance().editPlayerChapterInfo(this._playerChapterInfo);
            } else if (hasNextChapter && this._fightInfo.isBoss) { // boss批次且有下一章节 
                TipCtrl.getInstance().tipWithColor(this.battlegroundNode, "胜利", "#ffffff");
                this.clearAllSkillCd();
                this._playerChapterInfo.chapterId = this._playerChapterInfo.chapterId + 1; // 章节提升
                this._playerChapterInfo.batch = 0; // 章节怪物批次置0
                // 记录数据
                PlayerCacheCtrl.getInstance().editPlayerChapterInfo(this._playerChapterInfo);
                this.fightOverEvent(true,null);

                // 统计闯关数量
                PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.CHAPTER, 1);
                return;
            }


            // 跑图状态
            this._fightInfo.status = this.FIGHT_STATUS.BG_RUN;
            this._startBgRunTime = this._currTime;
            this.canExecSkill = false;
            this._playerGeneralAnimation(null, GeneralConfig.SPINE_ANIMATION_NAME.RUN, true, false);
            this.battlegroundRightNode.removeAllChildren(); // 清除所有怪物节点
            SpineUtil.getInstance().playSpineAni(this.qiliu.getComponent(sp.Skeleton), null, "start", true, false); // 播放气流

            // 下一关为BOSS
            if (this._playerChapterInfo.batch == this._chapterConfig.monsterBatch.length) {
                this.bossComing.active = true;
                this.bossComing.getComponent(sp.Skeleton);

                this.clearAllSkillCd();
                AudioManager.getInstance().playBossComming();

                // 左右边渲染spine，并播放run动作
                let leftSpSkeleton: sp.Skeleton = this.bossComingLeftNode.getComponent(sp.Skeleton);
                leftSpSkeleton.skeletonData = this._bossComingGeneralSpine;
                this.bossComingLeftNode.y = -this.bossComingLeftNode.height / 4;

                SpineUtil.getInstance().playSpineAni(leftSpSkeleton, null, GeneralConfig.SPINE_ANIMATION_NAME.RUN, true, false);
                let rightSpSkeleton: sp.Skeleton = this.bossComingRightNode.getComponent(sp.Skeleton);
                rightSpSkeleton.skeletonData = this._bossComingBossSpine;
                this.bossComingRightNode.y = -this.bossComingRightNode.height / 4;

                SpineUtil.getInstance().playSpineAni(rightSpSkeleton, null, GeneralConfig.SPINE_ANIMATION_NAME.RUN, true, false);

                SpineUtil.getInstance().playSpineAni(this.bossComing.getComponent(sp.Skeleton), () => {
                    // 隐藏提示文本
                    if (this.bossComing.active) {
                        this.bossComing.active = false;
                    }
                }, "start", false, false);
            }

            // 解锁相关功能
            this._checkUnlock();

        } else { // 未通关
            this._fightInfo.status = this.FIGHT_STATUS.WATING_RESET;
            // 如果当前批次为BOSS，退到上一个批次
            if (this._fightInfo.isBoss) {
                this._playerChapterInfo.batch -= 1; // 退到上一个批次
            } else { // 如果批次为普通，退到上一章节的初始批次
                this._playerChapterInfo.chapterId = this._playerChapterInfo.chapterId - 1 == 0 ? 1 : this._playerChapterInfo.chapterId - 1; // 章节降低，最低为初始章节
                this._playerChapterInfo.batch = 0
            }

            // 重置战斗
            this.fightOverEvent(true, null);
        }
    }

    /**
     * 战斗结束事件
     * @param 重置玩家
     * @param 副本关卡ID
     */
    public fightOverEvent(resetPlayer, challengeChapterId:number = null) {
        this.bossEnd.active = true;
        SpineUtil.getInstance().playSpineAni(this.bossEnd.getComponent(sp.Skeleton),()=>{
            this._fightInfo.generalStatus = this.GENERAL_STATUS.INIT;
            // 角色初始位置
            this.generalNode.setPosition(cc.v2(-500,0));
            this.bossEnd.active = false;
            this.resetFight(resetPlayer,challengeChapterId);
        },"start",false,false);
    }

    /**
     * 跑图
     */
    _bgRun(dt) {
        let bgRunTime = this._isChallenge ? this.CHALLENGE_BG_RUN_TIME : this.BG_RUN_TIME;
        if (this._currTime - this._startBgRunTime >= bgRunTime * 1000) {
            // 跑图时间到,停止气流播放，重置关卡
            // SpineUtil.getInstance().playSpineAni(this.qiliu.getComponent(sp.Skeleton),null,null,false,false);
            this.qiliu.getComponent(sp.Skeleton).animation = null;

            // 如果当前 关卡为副本  或 (当前关卡或下一关非BOSS关卡),此处重置战斗不重置玩家信息，保证流畅
            let resetPlayer = true;
            if (this._isChallenge || (this._playerChapterInfo.batch != 0 && this._playerChapterInfo.batch != this._chapterConfig.monsterBatch.length)) {
                resetPlayer = false;
            }

            let challengeChapterId = this._isChallenge ? this._chapterConfig.id : null; // 是否为副本中
            this.resetFight(resetPlayer,challengeChapterId);
        }

        if (this.fightBg1.x <= -this.fightBg1.width) {
            this.fightBg1.x = 0;
        }

        if (this.fightBg2.x <= 0) {
            this.fightBg2.x = this.fightBg2.width;
        }

        this.fightBg1.x -= (dt * 250);
        this.fightBg2.x -= (dt * 250);
    }

    /**
     * 检查功能解锁
     */
    private _checkUnlock() {
        this._checkSkillEquipPosUnlock();
        this._checkPetEquipPosUnlock();
    }

    /**
     * 检查技能装备位置是否可以解锁
     */
    private _checkSkillEquipPosUnlock() {
        let playerSkillEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfo();
        for (const posStr in playerSkillEquipInfoList) {
            let playerSkillEquipInfo = playerSkillEquipInfoList[posStr];
            let pos = Number(posStr);
            if (playerSkillEquipInfo.lockStatus == SkillConfig.EQUIP_POS_STATUS.LOCK) {
                let unlockCondition = SkillConfig.getEquipPosUnlockCondition(pos);
                let unlockFlag = UnlockManager.getInstance().unlock(unlockCondition.type, unlockCondition.content);
                if (unlockFlag) {
                    playerSkillEquipInfo.lockStatus = SkillConfig.EQUIP_POS_STATUS.UNLOCK;
                    PlayerCacheCtrl.getInstance().editPlayerSkillEquipInfo(pos, playerSkillEquipInfo);
                }
            }
        }
    }

    /**
     * 检查宠物装备位置是否可以解锁
     */
    private _checkPetEquipPosUnlock() {
        let playerPetEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfo();
        for (const posStr in playerPetEquipInfoList) {
            let playerPetEquipInfo = playerPetEquipInfoList[posStr];
            let pos = Number(posStr);
            if (playerPetEquipInfo.lockStatus == PetConfig.EQUIP_POS_STATUS.LOCK) {
                let unlockCondition = PetConfig.getEquipPosUnlockCondition(pos);
                let unlockFlag = UnlockManager.getInstance().unlock(unlockCondition.type, unlockCondition.content);
                if (unlockFlag) {
                    playerPetEquipInfo.lockStatus = PetConfig.EQUIP_POS_STATUS.UNLOCK;
                    PlayerCacheCtrl.getInstance().editPlayerPetEquipInfo(pos, playerPetEquipInfo);
                }
            }
        }
    }

    // 角色相关控制

    /**
     * 加载角色
     */
    private async _loadGeneral() {
        let generalConfig: GeneralBasic = GeneralConfig.getConfigById(this._fightInfo.generalId);
        let _generalConfig = {
            shortRange: true, // 近战
            atkRange: 10, // 攻击范围
            spine: generalConfig.spine, // 动画
            atkFrameTime: generalConfig.atkFrameTime, // 攻击动画帧时长
        }
        this._generalConfig = _generalConfig;
        this.loadGeneralAttr(); // 加载属性
        this._generalInfo.currHp = this._generalConfig.hp; // 初始化当前生命
        this.generalIsAlive = true; // 角色存活状态
        this._resetGeneralBlood(); // 重置角色血条

        // 角色动画
        this._generalSpSkeleton = this.generalNode.getChildByName("general").getComponent(sp.Skeleton);
        this._generalSpSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(this._generalConfig.spine);
        this._playerGeneralAnimation(null, GeneralConfig.SPINE_ANIMATION_NAME.RUN, true, false); // 默认为站立动画

        // 事件监听
        this._generalSpSkeleton.setEventListener((trackEntry, event) => {
            switch (event.data.name) {
                case "hit1":
                    this._genGeneralInitSkill();
                    break;
                default:
                    break;

            }
        });

        // 显示血条
        this.generalNode.getChildByName("blood").active = true;

        // 角色缩放倍数
        this.generalNode.getChildByName("general").scaleX = generalConfig.mainScale.x;
        this.generalNode.getChildByName("general").scaleY = generalConfig.mainScale.y;


        this.generalNode.active = true;

        // 加载角色技能
        this._loadGeneralSkill(generalConfig.skill.initSkill);

        // 在此处提前赋值好boss来袭的两边动画
        this._bossComingGeneralSpine = this._generalSpSkeleton.skeletonData;
        this._bossComingBossSpine = await SpineUtil.getInstance().getBundleSkeletonData(MonsterConfig.getConfigById(this._chapterConfig.boss[0]).spine);

    }

    /**
     * 加载玩家装备的技能信息列表
     */
    public _loadMainSkillList() {
        this.mainSkillContentNode.removeAllChildren();
        let playerSkillEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfo();
        for (const posStr in playerSkillEquipInfoList) {
            let playerSkillEquipInfo = playerSkillEquipInfoList[posStr];
            this._loadMainSkill(playerSkillEquipInfo);
        }

        // 自动技能按钮
        this._updateAutoSkill();
    }

    /**
     * 清除所有技能冷却时间
     */
    private clearAllSkillCd() {
        if(this._mainSkillInfoList.length == 0) {
            return;
        }

        for(let i = 0; i < this._mainSkillInfoList.length;i++) {
            let mainSkillInfo = this._mainSkillInfoList[i];
            let mainSkillNode = mainSkillInfo.node;
            mainSkillNode.getComponent(MainSkillCtrl).clearCdTime();
        }
    }

    /**
     * 加载玩家装备的宠物信息列表
     */
    public _loadMainPetList() {
        this.mainPetContentNode.removeAllChildren();
        let playerPetEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfo();
        for (const posStr in playerPetEquipInfoList) {
            let playerPetEquipInfo = playerPetEquipInfoList[posStr];
            this._loadMainPet(playerPetEquipInfo);
        }
    }

    /**
     * 切换自动技能开关
     * @param event 
     * @param customerData 
     */
    public switchAutoSkill(event, customerData) {
        AudioManager.getInstance().playCommonBtn();
        let autoSkillFlag = PlayerCacheCtrl.getInstance().getAutoSkill();
        PlayerCacheCtrl.getInstance().setAutoSkill(!autoSkillFlag);
        this._updateAutoSkill();
    }

    /**
     * 更新自动技能按钮
     */
    private _updateAutoSkill() {
        let autoSkillFlag = PlayerCacheCtrl.getInstance().getAutoSkill();
        let spritePic = ResPathKey.AUTO_SKILL_DISABLED;
        if (autoSkillFlag) {
            spritePic = ResPathKey.AUTO_SKILL_ENABLED;
        }
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.autoSkillButton.node.getChildByName("Background").getComponent(cc.Sprite), spritePic);
    }

    /**
     * 加载玩家装备的技能信息
     * @param playerSkillEquipInfo 玩家装备的技能信息
     */
    private _loadMainSkill(playerSkillEquipInfo) {
        let mainSkill = cc.instantiate(this.mainSkillPrefab);
        let mainSkillInfo = {
            pos: playerSkillEquipInfo.pos,
            node: mainSkill
        }
        this._mainSkillInfoList.push(mainSkillInfo);
        mainSkill.getComponent(MainSkillCtrl).init(playerSkillEquipInfo, this.node);
        this.mainSkillContentNode.addChild(mainSkill);
    }

    /**
    * 加载玩家装备的宠物信息
    * @param playerSkillEquipInfo 玩家装备的宠物信息
    */
    private _loadMainPet(playerPetEquipInfo) {
        let mainPet = cc.instantiate(this.mainPetPrefab);
        let mainPetInfo = {
            pos: playerPetEquipInfo.pos,
            node: mainPet
        }
        this._mainPetInfoList.push(mainPetInfo);
        mainPet.getComponent(MainPetCtrl).init(playerPetEquipInfo, this.node);
        this.mainPetContentNode.addChild(mainPet);
    }

    /**
     * 播放角色动画
     * @param name 动画名 
     * @Param loop 是否循环,默认false
     */
    private _playerGeneralAnimation(listener: any = null, name: string = "", loop: boolean = false, hideOnComplete: boolean = true) {
        if(this._generalSpSkeleton == null) {
            return;
        }

        let timeScale = 1.0;
        switch (name) {
            case GeneralConfig.SPINE_ANIMATION_NAME.ATK:
                timeScale = this._generalConfig.atkSpeed;
                break;
            case GeneralConfig.SPINE_ANIMATION_NAME.RUN:
                timeScale = 1.5;
                break;
            default:
                break;
        }
        this._generalSpSkeleton.timeScale = timeScale;
        SpineUtil.getInstance().playSpineAni(this._generalSpSkeleton, listener, name, loop, hideOnComplete);
    }

    /**
     * 加载角色技能
     * @param generalSkillId 角色技能ID
     */
    private _loadGeneralSkill(generalSkillId: number) {
        let generalSkillConfig: GeneralSkillBasic = GeneralSkillConfig.getConfigById(generalSkillId);
        this._generalInitSkill = generalSkillConfig;
    }

    /**
     * 加载角色属性，强化属性后需要重新加载
     */
    public loadGeneralAttr() {
        // 提升生命值时需要增加当前生命值
        if (this._generalConfig.hp != null && PlayerAttrCtrl.getInstance().hp - this._generalConfig.hp > 0) {
            this._generalInfo.currHp += PlayerAttrCtrl.getInstance().hp - this._generalConfig.hp;
        }

        this._generalConfig.atk = PlayerAttrCtrl.getInstance().atk;
        this._generalConfig.def = PlayerAttrCtrl.getInstance().def;
        this._generalConfig.hp = PlayerAttrCtrl.getInstance().hp;
        this._generalConfig.hpRestore = PlayerAttrCtrl.getInstance().hpRestore;
        this._generalConfig.speed = PlayerAttrCtrl.getInstance().speed;
        this._generalConfig.atkSpeed = PlayerAttrCtrl.getInstance().atkSpeed;
        this._generalConfig.crit = PlayerAttrCtrl.getInstance().crit;
        this._generalConfig.critDamage = PlayerAttrCtrl.getInstance().critDamage;

        // 计算生成初始技能间隔时间
        this._generalInfo.genInitSkillIntervalTime = this._generalConfig.atkFrameTime / this._generalConfig.atkSpeed * 1000;

        // 重置总战力
        this.resetTotalPower();
    }

    /**
     * 角色奔跑到战斗位置
     */
    private generalMoveToFightPos() {
        if(this.generalNode.x >= -180) {
            this._playerGeneralAnimation(null,GeneralConfig.SPINE_ANIMATION_NAME.STAND,true,false);
            // 角色准备好了
            this._fightInfo.generalStatus = this.GENERAL_STATUS.NORAML;
        }else {
            this.generalNode.x += 6;
        }
    }   

    /**
     * 角色被攻击
     * @param damage 伤害
     * @param isCritDamage 是否为暴击伤害 
     */
    public generalBeHit(damage: number, isCritDamage: boolean = false) {
        if (!this.generalIsAlive) {
            return;
        }

        // 计算扣血
        this._generalInfo.currHp = this._generalInfo.currHp - damage;

        TipCtrl.getInstance().damageWithColor(this.generalNode, TxtUtil.parseTxt(String(Math.ceil(damage))), isCritDamage ? "#ff4747": null, cc.v2(0, this.generalNode.getChildByName("general").height / 2));

        this._resetGeneralBlood();

        // 是否已经死亡
        if (this._generalInfo.currHp <= 0) {
            this.canExecSkill = false; // 不允许释放技能了
            this.generalIsAlive = false; // 角色死亡
            this.generalNode.getChildByName("blood").active = false;
            TipCtrl.getInstance().tipWithColor(this.battlegroundNode, "您已被敌人打败", "#ffffff");
            this.clearAllSkillCd();
            // 播放死亡后战斗状态置为结束
            this._playerGeneralAnimation(() => {
                this._fightInfo.status = this.FIGHT_STATUS.FINISH; // 结束
            }, GeneralConfig.SPINE_ANIMATION_NAME.DIE, false, false);
        }
        // else {
        //     // 播放受伤动画
        //     _playerGeneralAnimation(()=>{
        //         this._fightInfo.status = this.FIGHT_STATUS.FINISH; // 结束
        //     },GeneralConfig.SPINE_ANIMATION_NAME.HIT,false,false);
        // }
    }

    /**
     * 重置角色血条
     */
    private _resetGeneralBlood() {
        this.generalBloodProgressBarSprite.fillRange = this._generalInfo.currHp / this._generalConfig.hp;
    }

    /**
     * 重置总战力
     */
    public resetTotalPower() {
        this.totalPower.string = TxtUtil.parseTxt("" + PlayerAttrCtrl.getInstance().totalPower);
    }


    /**
     * 初始化音频
     */
    private initAudio() {
        // bgm
        AudioManager.getInstance().playBgm();
    }


    /**
     * 进入副本
     * @param challengeId 副本ID
     * @param level 副本等级
     */
    public enterChallenge(challengeId:number, level:number=1) {
        let challengeConfig:ChallengeBasic = ChallengeConfig.getConfigById(challengeId);
        if(challengeConfig == null) {
            return;
        }

        let challengeLevelConfig:ChallengeLevelBasic = ChallengeConfig.getLevelConfig(challengeId, level);
        if(challengeLevelConfig == null) {
            return;
        }
        
        // 副本的关卡
        let chapterConfig:ChapterBasic = ChapterConfig.getConfigById(challengeLevelConfig.chapterId);
        if(chapterConfig == null) {
            return;
        }

        this._challengeConfig = challengeConfig;
        this._challengeLevelConfig = challengeLevelConfig;
        this._challengeReward = challengeLevelConfig.reward; // 副本奖励
        this._challengeMonsterBatch = 0; // 副本怪物批次

        TipCtrl.getInstance().tipWithColor(this.battlegroundNode, "进入" + challengeConfig.name, "#ffffff");
        this.clearAllSkillCd();
        this.fightOverEvent(true, chapterConfig.id);
    }

     /**
     * 取消副本
     */
     public cancelChallenge() {
        if(!this._isChallenge) {
            return;
        }
        TipCtrl.getInstance().tipWithColor(this.node,"您逃跑了!","#ffffff");
        // 重置为正常战斗
        this.fightOverEvent(true,null);
        
    }

    /**
     * 展示副本通关奖励
     */
    private showCallengeRewardNode() {
        let itemConfig:ItemBasic = ItemConfig.getConfigById(this._challengeReward.itemId);
        if(itemConfig == null) {
            return;
        }
        let itemCount = this._challengeReward.itemCount;

        let view = this.challengeRewardNode.getChildByName("view");
        SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("reward").getChildByName("pic").getComponent(cc.Sprite),itemConfig.srcPath );
        view.getChildByName("reward").getChildByName("itemCount").getComponent(cc.Label).string = TxtUtil.parseTxt(String(itemCount));

        this.challengeRewardNode.active = true;
    }

    /**
     * 隐藏副本通关奖励
     */
    public closeCallengeRewardNode() {
        AudioManager.getInstance().playCommonBtn();
        this.challengeRewardNode.active = false;
    }


    /**
     * 展示设置界面
     */
    public showSettingView() {
        AudioManager.getInstance().playCommonBtn();
        this.initSettingView();
        this.settingNode.active = true;
    }

    /**
     * 设置开关切换
     * @param event
     * @param customerData 1-bgm 2-音效
     */
    public settingSwitch(event, customerData) {
        let switchType = Number(customerData);
        let playerSettingInfo = PlayerCacheCtrl.getInstance().getPlayerSettingInfo();    
        if(switchType == 1) {
            playerSettingInfo.bgm = !playerSettingInfo.bgm;
            // 检查bgm
            if(playerSettingInfo.bgm) {
                AudioManager.getInstance().playBgm();
            }else {
                AudioManager.getInstance().stopBgm();
            }
        }else if(switchType == 2) {
            playerSettingInfo.audio = !playerSettingInfo.audio;
        }


        PlayerCacheCtrl.getInstance().setPlayerSettingInfo(playerSettingInfo);

        this.showSettingView();
    }

    /**
     * 初始化设置界面
     */
    private initSettingView() {
        // 查看玩家设置信息
        let playerSettingInfo = PlayerCacheCtrl.getInstance().getPlayerSettingInfo();     
        
        // bgm
        let bgmPic = ResPathKey.SWITCH_CLOSE;
        if(playerSettingInfo.bgm) {
            bgmPic = ResPathKey.SWITCH_OPEN;
        }

        // 音效
        let audioPic = ResPathKey.SWITCH_CLOSE;
        if(playerSettingInfo.audio) {
            audioPic = ResPathKey.SWITCH_OPEN;
        }

        // 设置bgm和音效的图片
        let bgmSprite:cc.Sprite = this.settingNode.getChildByName("view").getChildByName("content").getChildByName("bgm").getChildByName("switch").getComponent(cc.Sprite);
        let audioSprite:cc.Sprite = this.settingNode.getChildByName("view").getChildByName("content").getChildByName("audio").getChildByName("switch").getComponent(cc.Sprite);

        SpriteManager.getInstance().setBundleSpriteFrameByName(bgmSprite,bgmPic);
        SpriteManager.getInstance().setBundleSpriteFrameByName(audioSprite,audioPic);
    }


    /**
     * 关闭设置界面
     */
    public closeSettingView() {
        AudioManager.getInstance().playCommonBtn();
        this.settingNode.active = false;
    }

    /**
     * 展示兑换码界面
     */
    public showCdkView() {
        AudioManager.getInstance().playCommonBtn();

        // 清空输入内容
        let cdkNode = this.settingNode.getChildByName("view").getChildByName("cdk");
        cdkNode.getChildByName("view").getChildByName("input").getComponent(cc.EditBox).string = "";

        cdkNode.active = true;
    }

    /**
     * 关闭兑换码界面
     */
    public closeCdkView() {
        AudioManager.getInstance().playCommonBtn();
        this.settingNode.getChildByName("view").getChildByName("cdk").active = false;
    }

     /**
     * 确认兑换
     */
    public confirmCdk() {
        let cdkNode = this.settingNode.getChildByName("view").getChildByName("cdk");
        let cdk:string = cdkNode.getChildByName("view").getChildByName("input").getComponent(cc.EditBox).string;
        if(cdk == "") {
            TipCtrl.getInstance().tipWithColor(cdkNode,"请输入兑换码!","#ffffff");
            return;
        }

        let cdkConfig:CdkBasic = CdkConfig.getConfigByCdk(cdk);
        if(cdkConfig == null) {
            TipCtrl.getInstance().tipWithColor(cdkNode,"兑换码不正确!","#ffffff");
            return;
        }

        let playerCdkInfo = PlayerCacheCtrl.getInstance().getPlayerCdkInfo(cdk);
        if(playerCdkInfo != null) {
            TipCtrl.getInstance().tipWithColor(cdkNode,"您已使用过该兑换码!","#ffffff");
            return;
        }

        // 物品
        let item = cdkConfig.reward;
        let itemConfig:ItemBasic = ItemConfig.getConfigById(item.itemId);
        if(itemConfig == null) {
            TipCtrl.getInstance().tipWithColor(cdkNode,"兑换码物品异常,请联系客服!","#ffffff");
            return;
        }

        AudioManager.getInstance().playGainReward();
        PlayerCacheCtrl.getInstance().addPlayerItem(item.itemId, item.itemCount);

        TipCtrl.getInstance().tipWithColor(cdkNode,"兑换成功!获得"+itemConfig.name + "×" + item.itemCount,"#ffffff");
        // 记录兑换信息
        playerCdkInfo = {
            cdk : cdk,
            time: new Date().getTime()
        }
        PlayerCacheCtrl.getInstance().setPlayerCdkInfo(cdk,playerCdkInfo);

        this.flushInfo();
    }

}
