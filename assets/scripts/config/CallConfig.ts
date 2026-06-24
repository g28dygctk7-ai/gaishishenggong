const { ccclass, property } = cc._decorator;

/**
 * 召唤配置
 */
@ccclass
export default class CallConfig {

    /**
     * 召唤功能
     */
    public static CALL_FUNCTION = {
        SKILL: 1, // 技能
        PET:2 // 宠物
    }


    public static GRADE_CONFIG = {
        GRADE1: {
            grade: 1,
            name: "普通",
            color: "#e7decd",
            pic: "ui/call/colorBox/1",
        },
        GRADE2: {
            grade: 1,
            name: "高级",
            color: "#b2e74b",
            pic: "ui/call/colorBox/2",
        },
        GRADE3: {
            grade: 1,
            name: "稀有",
            color: "#17b3ec",
            pic: "ui/call/colorBox/3",
        },
        GRADE4: {
            grade: 1,
            name: "史诗",
            color: "#c013e4",
            pic: "ui/call/colorBox/4",
        },
        GRADE5: {
            grade: 1,
            name: "传说",
            color: "#f1b44d",
            pic: "ui/call/colorBox/5",
        },
        GRADE6: {
            grade: 1,
            name: "神话",
            color: "#45debb",
            pic: "ui/call/colorBox/6",
        },
        GRADE7: {
            grade: 1,
            name: "超神",
            color: "#f11003",
            pic: "ui/call/colorBox/7",
        }
    }


    public static CALL_LEVEL_CONFIG = [
        {
            level: 1,
            oddsList: [1, 0, 0, 0, 0, 0, 0],
            levelUpExp: 0
        },
        {
            level: 2,
            oddsList: [0.75, 0.25, 0, 0, 0, 0, 0],
            levelUpExp: 30
        },
        {
            level: 3,
            oddsList: [0.47, 0.43, 0.10, 0, 0, 0, 0],
            levelUpExp: 80
        },
        {
            level: 4,
            oddsList: [0.19, 0.56, 0.23, 0.02, 0, 0, 0],
            levelUpExp: 150
        },
        {
            level: 5,
            oddsList: [0.20, 0.45, 0.28, 0.06, 0.01, 0, 0],
            levelUpExp: 400
        },
        {
            level: 6,
            oddsList: [0.18, 0.31, 0.37, 0.12, 0.015, 0.005, 0],
            levelUpExp: 1000
        },
        {
            level: 7,
            oddsList: [0.17, 0.22, 0.34, 0.24, 0.02, 0.009, 0.001],
            levelUpExp: 2000
        },
        {
            level: 8,
            oddsList: [0.066, 0.18, 0.29, 0.414, 0.03, 0.015, 0.005],
            levelUpExp: 3000
        },
        {
            level: 9,
            oddsList: [0.06, 0.10, 0.22, 0.54, 0.05, 0.02, 0.01],
            levelUpExp: 5000
        }, {
            level: 10,
            oddsList: [0.05, 0.05, 0.10, 0.65, 0.07, 0.05, 0.03],
            levelUpExp: 8000
        }
    ]

    public static CONFIG = [
        {
            id: 1,
            name: "技能",
            desc: "    用于召唤技能。",
            spine: "animation/call/call_skill/callSkill",
            openStatus: true,
            showAdButton: true
        },
        {
            id: 2,
            name: "宠物",
            desc: "    用于召唤宠物。",
            spine: "animation/call/call_pet/callPet",
            openStatus: true,
            showAdButton: true
        },
    ]

    /**
     * 召唤类型配置
     */
    public static CALL_TYPE_CONFIG = [
        {
            type: 1,
            count: 10,
            name: "召唤10次",
            itemId: 1006,
            itemCount: 550,
        },
        {
            type: 2,
            count: 30,
            name: "召唤30次",
            itemId: 1006,
            itemCount: 1500,
        },
    ];


    public static CONFIG_MAP = new Map<number, CallBasic>();

    public static CALL_LEVEL_CONFIG_MAP = new Map<number, CallLevelBasic>();

    public static CALL_TYPE_CONFIG_MAP = new Map<number, CallTypeBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {
        for (let i = 0; i < this.CONFIG.length; i++) {
            let config = this.CONFIG[i];
            this.CONFIG_MAP.set(config.id, config);
        }
        this.loadCallLevelConfigMap();
        this.loadCallTypeConfigMap();
    }

    /**
     * 加载召唤等级配置
     */
     public static loadCallLevelConfigMap() {
        for (let i = 0; i < this.CALL_LEVEL_CONFIG.length; i++) {
            let config = this.CALL_LEVEL_CONFIG[i];
            this.CALL_LEVEL_CONFIG_MAP.set(config.level, config);
        }
    }

    /**
     * 加载召唤类型配置
     */
    public static loadCallTypeConfigMap() {
        for (let i = 0; i < this.CALL_TYPE_CONFIG.length; i++) {
            let config = this.CALL_TYPE_CONFIG[i];
            this.CALL_TYPE_CONFIG_MAP.set(config.type, config);
        }
    }

    /**
     * 获取召唤配置
     * @param id 召唤ID
     */
    public static getConfigById(id: number) {
        return this.CONFIG_MAP.get(id);
    }

    /**
    * 获取品级配置
    * @param grade 品级
    */
    public static getGradeConfig(grade: number): GradeBasic {
        if (this.GRADE_CONFIG["GRADE" + grade] == null) {
            return null;
        }
        return this.GRADE_CONFIG["GRADE" + grade];
    }

    /**
     * 获取召唤等级对应的概率
     * @param callLevel 召唤等级
     */
    public static getCallLevelConfig(callLevel:number):CallLevelBasic {
        return this.CALL_LEVEL_CONFIG_MAP.get(callLevel);
    }

    /**
     * 召唤类型配置
     * @param type 召唤类型
     */
    public static getCallTypeConfig(type: number): CallTypeBasic {
        return this.CALL_TYPE_CONFIG_MAP.get(type);
    }
}

/**
 * 品阶配置
 */
export class GradeBasic {
    grade: number = null; // 品阶
    name: string = null; // 名称
    color: string = null; // 颜色
    pic: string = null; // 色块图片
}

/**
 * 召唤类型配置
 */
 export class CallTypeBasic {
    type: number = null; // 类型
    count:number = null; // 召唤次数
    name:string = null; // 按钮名称
    itemId: number = null; // 物品ID
    itemCount: number = null; // 物品数量
}

/**
 * 召唤等级配置
 */
 export class CallLevelBasic {
    level: number = null; // 召唤等级
    oddsList = null; // 概率列表
    levelUpExp: number = null; // 下一等级经验
}

/**
 * 召唤配置
 */
export class CallBasic {
    id: number = null; // 召唤功能id
    name: string = null; // 名称
    desc: string = null; // 介绍
    spine: string = null; // 物品资源路径
    openStatus: boolean = null; // 是否开放
    showAdButton: boolean = null; // 展示广告按钮
}