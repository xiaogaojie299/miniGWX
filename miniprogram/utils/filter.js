export function timeType(timer){
  // 2020/10/3-------------->2020-11-03
  if(timer.indexOf("/")!=-1){
    let arr = timer.split("/");
    arr[1]=arr[1]+1<10?"0"+(Number(arr[1])+1):Number(arr[1])+1;
    if(arr[2]){
     arr[2]=arr[2]<10?"0"+arr[2]:arr[2];
    }
    console.log(arr.join("-"))
    return arr.join("-");
  }else{
    let arr = timer.split("-");
    arr[1]=Number(arr[1])-1;
    if(arr[2]){
      arr[2]=Number(arr[2]);
    }
    return arr.join("/");
  }
}

export function dateType(timer,MonthType=false){
  // new Date() =========> 2020-02-01
  let month=timer.getMonth()+1<10?"0"+(timer.getMonth()+1):timer.getMonth()+1;
  let day=timer.getDate()<10?"0"+timer.getDate():timer.getDate();
  if(MonthType){
    return timer.getFullYear()+"-"+month
  }else{
    return timer.getFullYear()+"-"+month+"-"+day
  }
}

    /**
     * @params {phone:18328510362}  ==> 183****0362
     */
    export function encryptPhone(tel){
       let newPhone = tel.match(/(\d{3})(\d{4})(\d{4})/).slice(1).reduce(function(value, item, index) {
        //当index===1时，初始元素和当前元素累加并返回，value是初始值186，也是最终累加的返回值，item是当前索引下标是1的元素****。
        return index === 1 ? value + "****" : value + item;
      });
      return newPhone
    }