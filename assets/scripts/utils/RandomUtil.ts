const {ccclass, property} = cc._decorator;

@ccclass
export default class RandomUtil {

    /**按权重随产生机值,返回随机到的对象
     * weights_arr{
     * weight:10,
     * }
    */
    public static RandomByWeight(weights_arr) {
        var total_weight = weights_arr.reduce((total, w) => { return total + w.weight }, 0);
        var rand = Math.random() * total_weight;
        for (var i = 0; i < weights_arr.length; i++) {
            rand = rand - Number(weights_arr[i].weight);
            if (rand <= 0) {
                return weights_arr[i];
            }
        }
    }

    /**
     * 计算概率
    */
    public static random(rate:number) {
        var randRate = Math.random();
        return randRate < rate;
    }


    //   获得两个数之间的随机整数(不包含最大值max)
    public static getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
    }

    //   获得两个数之间的随机整数(可包含最大值max)
    public static getRandomPlus(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
    }

}
