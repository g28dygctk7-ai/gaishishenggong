import AttrLevelConfig from "../config/AttrLevelConfig";
import ResPathKey from "../config/ResPathKey";
import PetConfig, { PetBasic, PetGradeBasic } from "../config/PetConfig";
import SpriteManager from "../manager/SpriteManager";
import UnlockManager from "../manager/UnlockManager";
import ButtonUtil from "../utils/ButtonUtil";
import MathUtil from "../utils/MathUtil";
import MainCtrl from "./MainCtrl";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import TipCtrl from "./TipCtrl";
import CallConfig, { GradeBasic } from "../config/CallConfig";
import AudioManager from "../manager/AudioManager";
import TxtUtil from "../utils/TxtUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PetCtrl extends cc.Component {

    @property({ type: cc.Node, tooltip: '宠物列表内容节点' })
    petListContentNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: '宠物装备列表内容节点' })
    petEquipListContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '宠物预制体' })
    petPrefab: cc.Prefab = null;
    @property({ type: cc.Prefab, tooltip: '宠物装备预制体' })
    petEquipPrefab: cc.Prefab = null;


    @property({ type: cc.Button, tooltip: '召唤宠物按钮' })
    callButton: cc.Button = null;
    @property({ type: cc.Button, tooltip: '批量强化按钮' })
    batchLevelUpButton: cc.Button = null;

    @property({ type: cc.Node, tooltip: '详细信息节点' })
    petDetailNode: cc.Node = null;

    @property({ type: cc.Label, tooltip: '拥有效果' })
    effectValLabel: cc.Label = null;

    @property({ type: cc.Node, tooltip: '强化结果内容节点' })
    levelUpResultContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '强化结果预制体' })
    levelUpResultPrefab: cc.Prefab = null;


    /**
     * 宠物信息列表  {id/node}
     */
    private _petInfoList = [];
    /**
     * 宠物装备信息列表  {id/node}
     */
    private _petEquipInfoList = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onEnable() {
        this._init();
    }

    start() {
    }


    private _init() {
        // 检查位置是否可以解锁
        this._checkPetEquipPosUnlock();

        this._initPetList();

        this._initPetEquipList();

        // 更新拥有效果
        this._updatePetAllEffect()
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

    /**
     * 初始化宠物列表
     */
    private _initPetList() {
        this.petListContentNode.removeAllChildren();
        this._petInfoList = [];

        for (let i = 0; i < PetConfig.CONFIG.length; i++) {
            let petConfig: PetBasic = PetConfig.CONFIG[i];
            this._initPet(petConfig);
        }

        // 检查是否可以批量强化
        this._checkBatchLevelUp();
    }

    /**
     * 初始化宠物信息
     * @param petConfig 宠物配置
     */
    private async _initPet(petConfig: PetBasic) {
        let pet = cc.instantiate(this.petPrefab);

        let petInfo = {
            petId: petConfig.id,
            node: pet
        };
        this._petInfoList.push(petInfo);

        // 背景色
        let gradeConfig: GradeBasic = CallConfig.getGradeConfig(petConfig.grade);
        SpriteManager.getInstance().setBundleSpriteFrameByName(pet.getComponent(cc.Sprite), gradeConfig.pic);

        // 图片
        SpriteManager.getInstance().setBundleSpriteFrameByName(pet.getChildByName("pic").getComponent(cc.Sprite), petConfig.pic);

        // 点击事件
        ButtonUtil._setEvent(this.node, pet.getComponent(cc.Button), "PetCtrl", "showDetailView", petConfig.id + "");

        // 更新宠物节点信息
        this._updatePetNode(petConfig.id, pet);

        pet.active = true;
        this.petListContentNode.addChild(pet);
    }

    /**
    * 更新宠物节点信息
    */
    private _updateAllPetNode() {
        for (let i = 0; i < this._petInfoList.length; i++) {
            let petInfo = this._petInfoList[i];
            this._updatePetNode(petInfo.petId, petInfo.node);
        }
    }

    /**
     * 更新宠物节点信息
     * @param petId 宠物ID
     * @param pet 宠物节点
     */
    private _updatePetNode(petId: number, pet: cc.Node) {
        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);

        let petConfig: PetBasic = PetConfig.getConfigById(petId);

        // 是否解锁
        let currExp = 0;
        let currLevel = 0;
        if (playerPetInfo) { // 已解锁 隐藏锁 ，显示等级与装备功能
            pet.getChildByName("lock").active = false;
            pet.getChildByName("level").getComponent(cc.Label).string = "" + playerPetInfo.level;
            pet.getChildByName("level").active = true;

            currExp = playerPetInfo.exp;
            currLevel = playerPetInfo.level;

            if (playerPetInfo.equip == PetConfig.EQUIP_STATUS_MENU.EQUIP) { // 已装备
                pet.getChildByName("equip").active = false;
                pet.getChildByName("equipTip").active = true;
            } else { // 未装备
                pet.getChildByName("equipTip").active = false;
                pet.getChildByName("equip").active = true;
                ButtonUtil._setEvent(this.node, pet.getChildByName("equip").getComponent(cc.Button), "PetCtrl", "equipPet", petId + "");
            }
        } else { // 未解锁   显示锁 ，隐藏等级与装备功能
            pet.getChildByName("lock").active = true;
            pet.getChildByName("level").active = false;
            pet.getChildByName("equipTip").active = false;
            pet.getChildByName("equip").active = false;
        }

        let levelUpCostExp = PetConfig.getLevelUpCost(currLevel);



        // 是否已经满级
        let expBar = pet.getChildByName("expProgress").getChildByName("bar").getComponent(cc.Sprite);
        if (currLevel >= petConfig.levelConfig.length) { // 已满级
            expBar.fillRange = 1;
            pet.getChildByName("expProgress").getChildByName("num").getComponent(cc.Label).string = "已满级";
        } else { // 未满级
            expBar.fillRange = currExp / levelUpCostExp;
            pet.getChildByName("expProgress").getChildByName("num").getComponent(cc.Label).string = currExp + "/" + levelUpCostExp;
        }
    }



    /**
    * 初始化宠物装备列表
    */
    private _initPetEquipList() {
        this.petEquipListContentNode.removeAllChildren();
        this._petEquipInfoList = [];

        let maxNum = PetConfig.PET_EQUIP_MAX_NUM;
        for (let i = 0; i < maxNum; i++) {
            let pos = i + 1;
            this._initPetEquip(pos);
        }
    }

    /**
     * 初始化宠物装备信息
     * @param pos 宠物装备位置
     */
    private _initPetEquip(pos) {

        let petEquip = cc.instantiate(this.petEquipPrefab);
        let petEquipInfo = {
            pos: pos,
            node: petEquip
        }
        this._petEquipInfoList.push(petEquipInfo);

        this._updatePetEquipNode(pos, petEquip);

        petEquip.active = true;
        this.petEquipListContentNode.addChild(petEquip);
    }

    /**
    * 更新宠物总拥有效果
    */
    private _updatePetAllEffect() {
        let playerPetInfoList = PlayerCacheCtrl.getInstance().getPlayerPetInfo();
        if (playerPetInfoList == null) {
            return;
        }

        let totalEffect = 0;
        for (const petIdStr in playerPetInfoList) {
            let playerPetInfo = playerPetInfoList[petIdStr];
            let currLevel = playerPetInfo.level;
            // 宠物等级配置
            let petLevelConfig = PetConfig.getLevelConfig(Number(petIdStr), currLevel);
            totalEffect += petLevelConfig.addRate;
        }
        cc.log("宠物总拥有效果：", totalEffect);
        this.effectValLabel.string = "攻击力+" + MathUtil.parsePctPlus(totalEffect);

    }

    /**
    * 更新宠物装备节点信息
    */
    private _updateAllPetEquipNode() {
        for (let i = 0; i < this._petEquipInfoList.length; i++) {
            let petEquipInfo = this._petEquipInfoList[i];
            this._updatePetEquipNode(petEquipInfo.pos, petEquipInfo.node);
        }
    }

    /**
     * 更新宠物装备节点信息
     */
    private _updatePetEquipNode(pos, petEquip: cc.Node) {
        let playerPetEquipInfo = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfoByPos(pos);

        if (playerPetEquipInfo.lockStatus == PetConfig.EQUIP_POS_STATUS.UNLOCK) { // 位置已解锁
            // 是否已经装备
            if (playerPetEquipInfo.petId != null) { // 已装备
                let petId = playerPetEquipInfo.petId;
                petEquip.getChildByName("lock").active = false;
                petEquip.getChildByName("pic").active = true;
                petEquip.getChildByName("level").active = true;
                petEquip.getChildByName("cancelEquip").active = true;
                // 解除装备
                ButtonUtil._setEvent(this.node, petEquip.getChildByName("cancelEquip").getComponent(cc.Button), "PetCtrl", "notEquipPet", petId + "");

                let petConfig: PetBasic = PetConfig.getConfigById(petId);
                let gradeConfig: GradeBasic = CallConfig.getGradeConfig(petConfig.grade);
                // 背景
                SpriteManager.getInstance().setBundleSpriteFrameByName(petEquip.getComponent(cc.Sprite), gradeConfig.pic);
                // 图片
                SpriteManager.getInstance().setBundleSpriteFrameByName(petEquip.getChildByName("pic").getComponent(cc.Sprite), petConfig.pic);
                // 等级
                let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
                petEquip.getChildByName("level").getComponent(cc.Label).string = playerPetInfo.level;

                // 点击事件
                ButtonUtil._setEvent(this.node, petEquip.getComponent(cc.Button), "PetCtrl", "showDetailView", petConfig.id + "");
            } else { // 未装备
                petEquip.getChildByName("pic").active = false;
                petEquip.getChildByName("level").active = false;
                petEquip.getChildByName("cancelEquip").active = false;
                petEquip.getChildByName("lock").active = false;
                SpriteManager.getInstance().setBundleSpriteFrameByName(petEquip.getComponent(cc.Sprite), ResPathKey.BOX_EQUIP);
                ButtonUtil._delEvent(petEquip.getComponent(cc.Button));
            }
        } else { // 位置未解锁
            petEquip.getChildByName("pic").active = false;
            petEquip.getChildByName("level").active = false;
            petEquip.getChildByName("cancelEquip").active = false;
            petEquip.getChildByName("lock").active = true;

            SpriteManager.getInstance().setBundleSpriteFrameByName(petEquip.getComponent(cc.Sprite), ResPathKey.BOX_DISABLED);
            ButtonUtil._setEvent(this.node, petEquip.getComponent(cc.Button), "PetCtrl", "showUnlockTip", pos + "");
        }

    }

    /**
     * 是否可以批量强化（至少有一个宠物满足强化条件）
     */
    private _checkBatchLevelUp() {
        let playerPetInfoList = PlayerCacheCtrl.getInstance().getPlayerPetInfo();
        if (playerPetInfoList == null) {
            return;
        }

        let enoughConditionNum = 0; // 满足强化条件的数量
        for (const petIdStr in playerPetInfoList) {
            let petId = Number(petIdStr);
            if (this._checkLevelUp(PetConfig.getConfigById(petId), PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId))) {
                enoughConditionNum += 1;
            }
        }

        if (enoughConditionNum > 0) { // 满足批量强化条件
            this.batchLevelUpButton.interactable = true;
        } else { // 未满足批量强化条件
            this.batchLevelUpButton.interactable = false;
        }
    }

    /**
     * 是否可以强化
     */
    private _checkLevelUp(petConfig, playerPetInfo): boolean {
        if (petConfig == null || playerPetInfo == null) {
            return false;
        }

        if (playerPetInfo.level + 1 > petConfig.levelConfig.length) {
            return;
        }

        let levelUpCost = PetConfig.getLevelUpCost(playerPetInfo.level);
        if (playerPetInfo.exp < levelUpCost) {
            return;
        }

        return true;
    }

    /**
     * 
     * @param event 
     * @param customerData 
     */
    public ad(event, customerData) {
        let petId = Number(customerData);
        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
        if (playerPetInfo == null) {
            PlayerCacheCtrl.getInstance().playerGetPet(petId);
        }

        // 更新节点信息
        this._updateAllPetNode();

        // 更新宠物装备信息
        this._updateAllPetEquipNode();

        // 更新拥有效果
        this._updatePetAllEffect()
    }

    /**
     * 批量强化 (循环升级)
     */
    public batchLevelUp(event, customerData) {
        let playerPetInfoList = PlayerCacheCtrl.getInstance().getPlayerPetInfo();
        if (playerPetInfoList == null) {
            return;
        }

        let levelUpResultList = [];
        
        for (const petIdStr in playerPetInfoList) {
            let petId = Number(petIdStr);
            let levelUpResult = this.levelUp(null, petId, true);

            if(levelUpResult != null) {
                levelUpResultList.push(levelUpResult);
            }
        }

        AudioManager.getInstance().playLevelUp();

        // 更新拥有效果
        this._updatePetAllEffect()

        this._checkBatchLevelUp();

        // 展示升级结果
        this.showLevelUpResult(levelUpResultList);
    }

    /**
     * 指定强化
     * @param petId 宠物ID
     * @param loop 循环升级,默认false
     */
    public levelUp(event, petId: number, loop: boolean = false) {
        let isDetailViewLevelUp = typeof (petId) == "string";
        let petConfig: PetBasic = PetConfig.getConfigById(Number(petId));
        if (petConfig == null) {
            return;
        }

        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
        if (playerPetInfo == null) {
            return;
        }

        if (!this._checkLevelUp(petConfig, playerPetInfo)) {
            return;
        }

        let startLevel = playerPetInfo.level; // 开始升级前的等级

        let levelUpCost = PetConfig.getLevelUpCost(playerPetInfo.level);
        playerPetInfo.level += 1;
        playerPetInfo.exp -= levelUpCost;
        PlayerCacheCtrl.getInstance().editPlayerPetInfo(petId, playerPetInfo);

        // 循环升级
        if (loop) {
            this.levelUp(event, petId, loop);
        } else {
            AudioManager.getInstance().playLevelUp();
        }

        // 如果是详细界面中的强化，需要更新详细界面信息
        if (isDetailViewLevelUp) {
            this.showDetailView(null, Number(petId));
        }


        // 更新宠物信息
        this._updateAllPetNode();

        // 更新宠物装备信息
        this._updateAllPetEquipNode();

        // 更新玩家属性
        PlayerAttrCtrl.getInstance().calcPlayerAttr();
        let mainCtrl: MainCtrl = this.node.parent.parent.getChildByName("main").getComponent(MainCtrl);
        if (mainCtrl) {
            mainCtrl.loadGeneralAttr();
        }

        return {petId : petId , startLevel: startLevel, endLevel: PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId).level};
    }

    /**
     * 关闭界面
     */
    public close() {
        AudioManager.getInstance().playCommonBtn();
        this.node.active = false;
    }

    /**
     * 展示详细信息
     * @param event 
     * @param customerData 
     */
    public showDetailView(event, customerData) {
        if (customerData == null) {
            return;
        }

        let petId = Number(customerData);
        let petConfig: PetBasic = PetConfig.getConfigById(petId);
        if (petConfig == null) {
            return;
        }

        AudioManager.getInstance().playCommonBtn();

        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);

        let detailViewNode: cc.Node = this.petDetailNode.getChildByName("detailView");

        // 名称
        detailViewNode.getChildByName("name").getComponent(cc.Label).string = petConfig.name;
        // 品阶
        let gradeConfig: GradeBasic = CallConfig.getGradeConfig(petConfig.grade);
        detailViewNode.getChildByName("grade").getComponent(cc.Label).string = gradeConfig.name;
        detailViewNode.getChildByName("grade").color = new cc.Color().fromHEX(gradeConfig.color);
        // 图片
        SpriteManager.getInstance().setBundleSpriteFrameByName(detailViewNode.getChildByName("picBg").getComponent(cc.Sprite), gradeConfig.pic);
        SpriteManager.getInstance().setBundleSpriteFrameByName(detailViewNode.getChildByName("picBg").getChildByName("pic").getComponent(cc.Sprite), petConfig.pic);

        let currLevel = 0;
        let currExp = 0;

        if (playerPetInfo == null) { // 显示锁
            detailViewNode.getChildByName("lock").active = true;
        } else { // 隐藏锁
            detailViewNode.getChildByName("lock").active = false;
            currLevel = playerPetInfo.level;
            currExp = playerPetInfo.exp;
        }

        // 等级
        detailViewNode.getChildByName("levelInfo").getChildByName("levelBg").getChildByName("level").getComponent(cc.Label).string = "等级" + currLevel;

        // 是否已经满级
        let expBar = detailViewNode.getChildByName("levelInfo").getChildByName("exp").getChildByName("bar").getComponent(cc.Sprite);
        if (currLevel >= petConfig.levelConfig.length) { // 已满级
            expBar.fillRange = 1;
            detailViewNode.getChildByName("levelInfo").getChildByName("exp").getChildByName("num").getComponent(cc.Label).string = "已满级";
        } else { // 未满级
            // 经验进度条
            let levelUpCostExp = PetConfig.getLevelUpCost(currLevel);
            expBar.fillRange = currExp / levelUpCostExp;
            detailViewNode.getChildByName("levelInfo").getChildByName("exp").getChildByName("num").getComponent(cc.Label).string = currExp + "/" + levelUpCostExp;
        }



        // 宠物等级配置
        let petLevelConfig = PetConfig.getLevelConfig(petId, currLevel);

        // 攻击力
        detailViewNode.getChildByName("descView").getChildByName("atkInfo").getChildByName("atk").getComponent(cc.Label).string = TxtUtil.parseTxt(Math.ceil(PlayerAttrCtrl.getInstance().atk * petLevelConfig.atkRate) + "");

        // 攻击速度
        detailViewNode.getChildByName("descView").getChildByName("atkSpeedInfo").getChildByName("atkSpeed").getComponent(cc.Label).string = MathUtil.parsePctPlus(petLevelConfig.atkSpeed);

        // 拥有效果
        detailViewNode.getChildByName("descView").getChildByName("effectBg").getChildByName("attrName").getComponent(cc.Label).string = AttrLevelConfig.getConfigById(petLevelConfig.addAttrKey).name;
        detailViewNode.getChildByName("descView").getChildByName("effectBg").getChildByName("attrVal").getComponent(cc.Label).string = "+" + MathUtil.parsePctPlus(petLevelConfig.addRate);

        // 是否能够强化
        let levelUpFlag = this._checkLevelUp(petConfig, playerPetInfo);
        if (levelUpFlag) {
            ButtonUtil._setEvent(this.node, detailViewNode.getChildByName("button").getChildByName("levelUp").getComponent(cc.Button), "PetCtrl", "levelUp", petId + "");
            detailViewNode.getChildByName("button").getChildByName("levelUp").getComponent(cc.Button).interactable = true;
        } else {
            detailViewNode.getChildByName("button").getChildByName("levelUp").getComponent(cc.Button).interactable = false;
        }

        // 是否能够装备
        let equipButton: cc.Button = detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button);
        let equipButtonLabel: cc.Label = equipButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        if (petConfig == null || playerPetInfo == null) { // 没有该宠物
            detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button).interactable = false;
            equipButtonLabel.string = "装备";
        } else if (playerPetInfo.equip == PetConfig.EQUIP_STATUS_MENU.EQUIP) { // 有该宠物，但是已经装备了
            equipButtonLabel.string = "解除";
            detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button).interactable = true;
            // 解除装备事件
            ButtonUtil._setEvent(this.node, equipButton, "PetCtrl", "notEquipPet", petConfig.id + "");

        } else { // 可以装备
            equipButtonLabel.string = "装备";
            detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button).interactable = true;
            // 装备事件
            ButtonUtil._setEvent(this.node, equipButton, "PetCtrl", "equipPet", petConfig.id + "");
        }

        this.petDetailNode.active = true;
    }

    /**
     * 解锁提示
     * @param event 
     * @param customerData 
     */
    public showUnlockTip(event, customerData) {
        let pos = Number(customerData);
        let unlockCondition = PetConfig.getEquipPosUnlockCondition(pos);
        let desc = UnlockManager.getInstance().getUnlockDesc(unlockCondition.type, unlockCondition.content);
        TipCtrl.getInstance().tipWithColor(this.node, desc, "#ffffff");
    }

    /**
     * 装备宠物
     * @param event 
     * @param customerData 
     */
    public equipPet(event, customerData) {
        // 是否有空闲的有效位置
        let freePos = 0;
        let playerPetEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfo();
        if (playerPetEquipInfoList == null) {
            return;
        }

        for (const posStr in playerPetEquipInfoList) {
            let playerPetEquipInfo = playerPetEquipInfoList[posStr];
            if (playerPetEquipInfo.lockStatus == PetConfig.EQUIP_POS_STATUS.UNLOCK &&
                playerPetEquipInfo.petId == null) {
                freePos = playerPetEquipInfo.pos;
                break;
            }
        }

        if (freePos == 0) {
            TipCtrl.getInstance().tipWithColor(this.node, "当前没有空闲位置可以装备", "#ffffff");
            return;
        }

        AudioManager.getInstance().playCommonBtn();

        // 装备宠物
        let petId = Number(customerData);
        let playerPetEquipInfo = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfoByPos(freePos);
        playerPetEquipInfo.petId = petId;
        PlayerCacheCtrl.getInstance().editPlayerPetEquipInfo(freePos, playerPetEquipInfo);
        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
        playerPetInfo.equip = PetConfig.EQUIP_STATUS_MENU.EQUIP;
        PlayerCacheCtrl.getInstance().editPlayerPetInfo(petId, playerPetInfo);

        this.closeDetailView();

        // 更新宠物信息
        this._updateAllPetNode();
        // 更新宠物装备信息
        this._updateAllPetEquipNode();
        // 更新拥有效果
        this._updatePetAllEffect()
    }

    /**
     * 解除装备
     * @param event 
     * @param customerData 
     */
    public notEquipPet(event, customerData) {

        let petId = Number(customerData);
        let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
        if (playerPetInfo == null || playerPetInfo.equip == PetConfig.EQUIP_STATUS_MENU.UN_EQUIP) {
            return;
        }

        AudioManager.getInstance().playCommonBtn();

        playerPetInfo.equip = PetConfig.EQUIP_STATUS_MENU.UN_EQUIP;
        PlayerCacheCtrl.getInstance().editPlayerPetInfo(petId, playerPetInfo);

        let playerPetEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerPetEquipInfo();
        for (const posStr in playerPetEquipInfoList) {
            let playerPetEquipInfo = playerPetEquipInfoList[posStr];
            if (playerPetEquipInfo.lockStatus == PetConfig.EQUIP_POS_STATUS.UNLOCK &&
                playerPetEquipInfo.petId == petId) {
                playerPetEquipInfo.petId = null;
                PlayerCacheCtrl.getInstance().editPlayerPetEquipInfo(Number(posStr), playerPetEquipInfo);
                break;
            }
        }


        this.closeDetailView();

        // 更新宠物信息
        this._updateAllPetNode();
        // 更新宠物装备信息
        this._updateAllPetEquipNode();
        // 更新拥有效果
        this._updatePetAllEffect()
    }

    /**
     * 关闭详细信息
     */
    public closeDetailView() {
        AudioManager.getInstance().playCommonBtn();
        this.petDetailNode.active = false;
    }

    /**
     * 跳转召唤功能
     */
    public toCallFunction() {
        AudioManager.getInstance().playCommonBtn();
        this.node.active = false;
        this.node.parent.getChildByName("call").active = true;
    }

    
    /**
     * 展示强化结果
     * @param levelUpResultList 升级结果信息列表
     */
     private showLevelUpResult(levelUpResultList) {
        cc.log("showLevelUpResult -> levelUpResult",levelUpResultList);
        if(levelUpResultList == null || levelUpResultList.length <= 0) {
            return;
        }


        this.levelUpResultContentNode.removeAllChildren();

        for(let i = 0; i < levelUpResultList.length; i++) {
            let levelUpResultInfo = levelUpResultList[i];
            let petId = levelUpResultInfo.petId;
            let startLevel = levelUpResultInfo.startLevel;
            let endLevel = levelUpResultInfo.endLevel;

            let petConfig:PetBasic = PetConfig.getConfigById(petId);
            let gradeConfig:GradeBasic = CallConfig.getGradeConfig(petConfig.grade);
            let levelUpResultNode = cc.instantiate(this.levelUpResultPrefab);
            SpriteManager.getInstance().setBundleSpriteFrameByName(levelUpResultNode.getComponent(cc.Sprite), gradeConfig.pic);
            SpriteManager.getInstance().setBundleSpriteFrameByName(levelUpResultNode.getChildByName("pic").getComponent(cc.Sprite), petConfig.pic);
            levelUpResultNode.getChildByName("levelInfo").getChildByName("leftLevel").getComponent(cc.Label).string = startLevel + "";
            levelUpResultNode.getChildByName("levelInfo").getChildByName("rightLevel").getComponent(cc.Label).string = endLevel + "";
            levelUpResultNode.active = true;
            this.levelUpResultContentNode.addChild(levelUpResultNode);
        }

        this.node.getChildByName("levelUpDetail").active = true;
    }

    /**
     * 关闭强化结果
     */
    public closeLevelUpResult() {
        this.node.getChildByName("levelUpDetail").active = false;
    }
}
