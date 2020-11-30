export function timeType(timer){
  // 2020/10/3-------------->2020-11-03
  if(timer.indexOf("/")!=-1){
    let arr = timer.split("/");
    arr[1]=arr[1]+1<10?"0"+Number(arr[1])+1:Number(arr[1])+1;
    if(arr[2]){
      arr[2]=arr[2]<10?"0"+arr[2]:arr[2];
    }
    return arr.join("-");
  }else{
    let arr = timer.split("-");
    arr[1]=Number(arr[1])-1;
    if(arr[2]){
      arr[2]=Number(arr[2])-1;
    }
    return arr.join("/");
  }

}