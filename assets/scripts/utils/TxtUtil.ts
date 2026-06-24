// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 文本工具类
 */
@ccclass
export default class TxtUtil extends cc.Component {

    /**
     * 单位
     */
    public static UNITS = ['','K','M','B','T','aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo',"pp","qq","rr","ss","tt","uu","vv","ww","xx","yy","zz",];

    public static parseTxt(content:string){
        let length = content.length;
        if(length <= 3){
            return content;
        }
        let times = Math.floor((length-1)/3);

        let remainder = length%3;

        remainder = remainder == 0 ? 3 : remainder;

        let unit = '';

        for(let i=0;i<remainder;i++){
            unit+=content[i];

        }

        unit+='.';

        unit+=content[remainder];
        unit+=content[remainder + 1];

        unit+=this.UNITS[times];

        return unit;

 

    }
}
