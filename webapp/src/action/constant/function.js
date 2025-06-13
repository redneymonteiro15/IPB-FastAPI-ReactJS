

export const navigationTo = (pageName, reload) => {
    if(reload){
        window.location.reload()
    }
    window.location.href=`/${pageName}`
}