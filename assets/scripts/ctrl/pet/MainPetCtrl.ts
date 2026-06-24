
import PetConfig, { PetBasic, PetLevelBasic } from "../../config/PetConfig";
import MainCtrl from "../MainCtrl";
import PlayerCacheCtrl from "../PlayerCacheCtrl";
import SpineUtil from "../../utils/SpineUtil";
import PetSkillCtrl from "../generalSkill/PetSkillCtrl";
import GeneralSkillConfig, { GeneralSkillBasic } from "../../config/GeneralSkillConfig";

const {ccclass, property} = cc._decorator;

/**
 * 装备的宠物信息
 */
@ccclass
export default class MainPetCtrl extends cc.Component {

    @property({type:cc.Prefab, tooltip:'宠物技能预制体'})
    petSkillPrefab:cc.Prefab = null;

    /**
     * 目标节点
     */
    private _mainPetEquipInfo = {
        pos: 0,
        petId: null,
        level: null,
        lockStatus: null
    };

    /**
     * 主节点
     */
    private _mainNode:cc.Node = null;

    /**
     * 主节点脚本
     */
    private _mainCtrl:MainCtrl = null;

    /**
     * spine组件
     */
    private _spSkeleton:sp.Skeleton = null;
    
    /**
     * 当前时间
     */
    private _nowTime: number = 0;

    /**
     * 检查宠物节点信息的间隔时间（毫秒)
     */
    private _checkUpdateMainPetIntervalTime:number = 300;

    /**
     * 上一次检查宠物节点信息时间
     */
    private _lastCheckUpdateMainPetTime:number = 0;

    /**
     * 上一次攻击的时间
     */
    private _lastAtkTime:number = 0;

    /**
     * 攻击间隔 = 宠物攻击速度
     */
    private _atkIntervalTime:number = 0;

    /**
     * 正在跑
     */
    public _isRunning: boolean = false;



     /**
     * 状态枚举
     */
    private STATUS_MENU = {
        INIT: 0, //初始化
        READY: 1, //准备好了
        NORMAL: 2, // 正常
        FINISH: 3, //结束了，可以销毁了
    }

    /**
     * 当前状态
     */
    private _status = this.STATUS_MENU.INIT;
    /**
     * 宠物配置
     */
    private _petConfig:PetBasic = null;

    /**
     * 宠物技能配置
     */
    private _petSkillConfig:GeneralSkillBasic = null;

    /**
     * 宠物等级配置
     */
    private _petLevelConfig:PetLevelBasic = null;

    start() {

    }

    /**
     * 检查宠物栏信息是否有变更
     * @returns 
     */
    private _checkUpdateMainSKill() {
        if(this._lastCheckUpdateMainPetTime + this._checkUpdateMainPetIntervalTime > this._nowTime) {
            return;
        }

        let playerPetEquipInfo = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfoByPos(this._mainPetEquipInfo.pos);
        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(playerPetEquipInfo.petId);
        if(playerPetEquipInfo.petId != this._mainPetEquipInfo.petId ||
            playerPetEquipInfo.lockStatus != this._mainPetEquipInfo.lockStatus) {
                this.updateMainPet(playerPetEquipInfo);
        }else if(playerPetEquipInfo.petId != null && 
            playerPetInfo.level != this._mainPetEquipInfo.level) {  
                this.updateMainPet(playerPetEquipInfo); 
        }
        this._lastCheckUpdateMainPetTime = this._nowTime;
    }

    update(dt) {
        this._nowTime += (dt * 1000);

        if(this._status == this.STATUS_MENU.NORMAL) {

            this._checkUpdateMainSKill();

            if(this._petConfig == null) {
                return;
            }

            if(this._mainCtrl._monsterList.length > 0 && this._mainCtrl.canExecSkill) {
                // 检查攻击
                this._checkAtk();
            }else if(!this._isRunning) {
                this._playePetAnimation(null, PetConfig.PET_SPINE_ANIMATION_NAME.RUN,true, false);
            }
        }
    }

    /**
     * 检查攻击
     */
    private _checkAtk() {
        if(this._lastAtkTime + this._atkIntervalTime > this._nowTime) {
            return;
        }

        // 播放攻击动画
        this._playePetAnimation(null, PetConfig.PET_SPINE_ANIMATION_NAME.ATK, false, false);

        this._lastAtkTime = this._nowTime;
    }
   
    /**
     * 初始化
     * @param mainPetEquipInfo 宠物信息
     * @param mainNode 主节点
     */
    public init(mainPetEquipInfo,mainNode:cc.Node) {
        this._mainPetEquipInfo.pos = mainPetEquipInfo.pos;
        this._mainPetEquipInfo.petId = mainPetEquipInfo.petId;
        this._mainPetEquipInfo.lockStatus = mainPetEquipInfo.lockStatus;
        this._mainNode = mainNode;
        this._mainCtrl = mainNode.getComponent(MainCtrl);
        this._spSkeleton = this.node.getComponent(sp.Skeleton);
        this._init();
    }

    private async _init() {
        this.updateMainPet(this._mainPetEquipInfo);
        
        // 显示节点
        this.node.active = true;

        // 正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }

    /**
     * 是否进入冷却
     * @param cd 进入冷却，默认false
     */
    public async updateMainPet(mainPetEquipInfo) {
        this._mainPetEquipInfo.pos = mainPetEquipInfo.pos;
        this._mainPetEquipInfo.petId = mainPetEquipInfo.petId;
        this._mainPetEquipInfo.lockStatus = mainPetEquipInfo.lockStatus;
        this._mainPetEquipInfo.level = null;
        this._petLevelConfig = null;
        this._petConfig = null;
        this._petSkillConfig = null;
        this.node.getChildByName("shadow").active = false;
        // 位置是否已经解锁
        this._spSkeleton.skeletonData = null;
        if(PetConfig.EQUIP_POS_STATUS.LOCK != this._mainPetEquipInfo.lockStatus) {
            // 是否有装备宠物
            let petId = this._mainPetEquipInfo.petId;
            if(petId != null) {
                let petConfig:PetBasic = PetConfig.getConfigById(petId);
                this._spSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(petConfig.spine);

                 // 事件监听
                this._spSkeleton.setEventListener((trackEntry, event) => {
                    switch (event.data.name) {
                        case "hit1":
                            this.atkFrame(null,null);
                            break;
                        default:
                            break;

                    }
                });

                this.node.getChildByName("shadow").active = true;

                // 宠物等级配置
                let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
                this._mainPetEquipInfo.level = playerPetInfo.level;
                this._petLevelConfig = PetConfig.getLevelConfig(petId,playerPetInfo.level);
                this._petConfig = petConfig;
                this._petSkillConfig =  GeneralSkillConfig.getConfigById(this._petConfig.initSkill)
                
                this._atkIntervalTime = (this._petConfig.atkFrameTime / this._petLevelConfig.atkSpeed) * 1000; // 计算攻击间隔(毫秒)
                this.node.scaleX = petConfig.mainScale.x;
                this.node.scaleY = petConfig.mainScale.y;

                let mainInitPos = PetConfig.getEquipPosMainInitPos(this._mainPetEquipInfo.pos);

                this.node.x = mainInitPos.x;
                this.node.y = mainInitPos.y;
            }
        }

    }
    
    /**
     * 释放技能
     */
    public atkFrame(event, customerData) {
        if(this._mainCtrl._monsterList.length == 0) {
            return;
        }

        // let execPet = cc.instantiate(this.execPetPrefab);
        // execPet.getComponent(ExecPetCtrl).init(this._petConfig,this._petLevelConfig,this._mainNode);
        // this._mainCtrl.battlegroundLeftNode.addChild(execPet);

        let targetNode = this._mainCtrl._monsterList[0].node;
        let genPos = {
            x : this.node.position.x,
            y : this.node.position.y,
        }

        if(this._petLevelConfig == null) {
            return;
        }

        // 释放技能，造成伤害为
        let petSkill = cc.instantiate(this.petSkillPrefab);
        petSkill.getComponent(PetSkillCtrl).init(this._petSkillConfig,targetNode,this._mainCtrl,this._petLevelConfig.atkRate,genPos);
        this._mainCtrl.battlegroundLeftNode.addChild(petSkill);
    }


    
    /**
     * 播放宠物动画
     * @param name 动画名 
     * @Param loop 是否循环,默认false
     */
     private _playePetAnimation(listener: any = null, name: string = "", loop: boolean = false, hideOnComplete: boolean = true) {
        // 当前播放的动画和即将播放的动画一致，不用处理
        let timeScale = 1.0;
        switch (name) {
            case PetConfig.PET_SPINE_ANIMATION_NAME.STAND:
                this._isRunning = false;
                break;
            case PetConfig.PET_SPINE_ANIMATION_NAME.RUN:
                timeScale = 1.0;
                this._isRunning = true;
                break;
            default:
                this._isRunning = false;
                break;
        }
        this._spSkeleton.timeScale = timeScale;
        SpineUtil.getInstance().playSpineAni(this._spSkeleton, listener, name, loop, hideOnComplete);
    }
}
