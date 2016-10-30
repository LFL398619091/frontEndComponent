define([],function(){
    function common(){

    }
    /**
    * @authors:jameslin
    * @date:2016-10-01 17:48:30
    * @description:判断非空
    */
    common.isNullOrSpace = function isNullOrSpace(str){  
        return str == null || str.value == "";  
    } 
    /** 
     * java String hashCode 的实现 
     * @param strKey 
     * @return intValue 
     */   
    common.hashCode = function hashCode(strKey){  
        var hash = 0;  
        if(!isNullOrSpace(strKey)){  
            for (var i = 0; i < strKey.length; i++){  
                hash = hash * 31 + strKey.charCodeAt(i);  
                hash = intValue(hash);  
            }  
        }  
        return hash;  
    } 
    /** 
     * 将js页面的number类型转换为java的int类型 
     * @param num 
     * @return intValue 
     */  
    common.intValue = function intValue(num){  
        var MAX_VALUE = 0x7fffffff;  
        var MIN_VALUE = -0x80000000;  
        if(num > MAX_VALUE || num < MIN_VALUE){  
            return num &= 0xFFFFFFFF;  
        }  
        return num;  
    } 

    return {
        common:common
    }
});
    
    

    
     

     
     