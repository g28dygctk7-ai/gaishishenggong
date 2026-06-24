const { ccclass, property } = cc._decorator;

/**
 * 兑换码配置
 */
@ccclass
export default class CdkConfig {

  

    public static CONFIG = [
        {
            cdk: "yzjd666",
            reward: {
                itemId: 1006,
                itemCount: 666
            }
        },
        {
            cdk: "yzjd888",
            reward: {
                itemId: 1006,
                itemCount: 888
            }
        }






        ,
        {
            cdk: "zporty10011000000",
            reward: {
                itemId: 1001,
                itemCount: 1000000
            }
        },
        {
            cdk: "zporty10031000000",
            reward: {
                itemId: 1003,
                itemCount: 1000000
            }
        },
        {
            cdk: "zporty10061000000",
            reward: {
                itemId: 1006,
                itemCount: 1000000
            }
        }
    ]


    public static CONFIG_MAP = new Map<string, CdkBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {

        for(let i = 0; i < this.CONFIG.length; i++) {
            let config = this.CONFIG[i];
            this.CONFIG_MAP.set(config.cdk, config);
        }
    }

    /**
     * 获取配置
     * @param cdk cdk
     */
    public static getConfigByCdk(cdk: string) {
        return this.CONFIG_MAP.get(cdk);
    }


}



/**
 * 配置类
 */
export class CdkBasic {
    cdk: string = null; // 属性标识
    reward = null; // 奖励
}