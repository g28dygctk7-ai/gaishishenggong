import PlayerCacheCtrl from "../ctrl/PlayerCacheCtrl";
import ItemConfig from "../config/ItemConfig";
import PlayerLevelConfig, { PlayerLevelBasic } from "../config/PlayerLevelConfig";
import ChapterConfig from "../config/ChapterConfig";

/**
 * 解锁管理
 */
export default class UnlockManager extends cc.Component {

    /**
     * 解锁类型
     */
    public static UNLOCK_TYPE = {
        FREE: 0, // 免费
        ITEM: 1, // 物品
        ADVERT: 2, // 广告
        PLAYER_LEVEL: 3, // 阶级
        CHAPTER: 4, // 章节
    }

    private static _instance: UnlockManager = null;
    private _clips: any = {};

    public static getInstance() {
        if (!this._instance) {
            this._instance = new UnlockManager();
            this._instance._init();
        }
        return this._instance;
    }

    public static destroyInstance() {
        if (this._instance) {
            this._instance._destroy();
            delete this._instance;
            this._instance = null;
        }
    }

    private _init() {

    }

    private _destroy() {

    }

    /**
     * 获取解锁介绍说明文本
     * @param type 解锁类型
     * @param content 解锁内容
     */
    public getUnlockDesc(type: number, content): string {
        if (type == UnlockManager.UNLOCK_TYPE.FREE) {
            return this.getUnlockDescByFree(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.ITEM) {
            return this.getUnlockDescByItem(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.ADVERT) {
            return this.getUnlockDescByAdvert(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.PLAYER_LEVEL) {
            return this.getUnlockDescByPlayerLevel(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.CHAPTER) {
            return this.getUnlockDescByChapter(content);
        }

        return "无";
    }

    /**
     * 免费获得说明文本
     * @param content 
     */
    getUnlockDescByFree(content) {
        return "免费获得";
    }

    /**
     * 消耗物品获得说明文本
     * @param content 
     */
    getUnlockDescByItem(content) {
        if (content == null || content.itemId == null || content.itemCount == null) {
            return "暂不可获取";
        }
        let itemId = content.itemId; // 物品ID
        let itemCount = content.itemCount; // 物品数量

        let itemName = ItemConfig.getConfigById(itemId).name;

        return "消耗" + itemName + "*" + itemCount + "可获得";
    }

    /**
     * 观看广告获得说明文本
     * @param content 
     */
    getUnlockDescByAdvert(content) {
        if (content == null || content <= 1) {
            return "观看广告后可获得";
        }

        return "观看" + content + "次广告后可获得";
    }

    /**
    * 阶级达到获得说明文本
    * @param content 
    */
    getUnlockDescByPlayerLevel(content) {
        let level = Number(content); // 解锁等级
        let playerLevelConfig: PlayerLevelBasic = PlayerLevelConfig.getConfigByLevel(level);
        if (playerLevelConfig == null) {
            return "暂不可获取";
        }

        return "玩家阶级到达" + playerLevelConfig.name + "后可获得";
    }

    /**
    * 章节达到获得说明文本
    * @param content 
    */
    getUnlockDescByChapter(content) {
        let chapterId = Number(content); // 解锁等级
        let chapterConfig = ChapterConfig.getConfigById(chapterId);
        if (chapterConfig == null) {
            return "暂不可获取";
        }

        return "通过" + chapterConfig.name + "后可解锁";
    }
























    /**
     * 解锁
     * @param type 解锁类型
     * @param content 解锁内容
     */
    public unlock(type: number, content):boolean {
        if (type == UnlockManager.UNLOCK_TYPE.FREE) {
            return this.unlockByFree(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.ITEM) {
            return this.unlockByItem(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.ADVERT) {
            return this.unlockByAdvert(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.PLAYER_LEVEL) {
            return this.unlockByPlayerLevel(content);
        } else if (type == UnlockManager.UNLOCK_TYPE.CHAPTER) {
            return this.unlockByChapter(content);
        }

        return false;
    }

    /**
     * 免费解锁
     * @returns 
     */
    unlockByFree(content) {
        return true;
    }

    /**
     * 物品解锁
     * @returns 
     */
    unlockByItem(content) {
        if (content == null || content.itemId == null || content.itemCount == null) {
            return false;
        }
        let itemId = content.itemId; // 物品ID
        let itemCount = content.itemCount; // 物品数量

        return PlayerCacheCtrl.getInstance().costPlayerItem(itemId, itemCount);
    }

    /**
     * 广告解锁
     * @returns 
     */
    unlockByAdvert(content) {
        return true;
    }

    /**
     * 阶级解锁
     * @returns 
     */
    unlockByPlayerLevel(content) {
        let level = Number(content); // 解锁等级
        let playerLevel = PlayerCacheCtrl.getInstance().getPlayerLevel(); // 玩家当前等级
        return playerLevel >= level;
    }

    /**
    * 闯关章节解锁
    * @returns 
    */
    unlockByChapter(content) {
        let chapterId = Number(content); // 解锁等级
        let playerChapterId = PlayerCacheCtrl.getInstance().getPlayerChapterInfo().chapterId; // 玩家当前通关关卡
        return playerChapterId >= chapterId;
    }
}
