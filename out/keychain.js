const keychain = {
    exists : function (){
        if (typeof window !== "undefined" && window.hive_keychain){
            return true
        } else {
            return false
        }
    }
}

while (!keychain.exists()){
    console.log('complain')
}