export function flagButtons() {
    const changeFlag = (value) => {
        console.log(value);
    }
    
    const rsFlag = document.getElementById('rs-flag');
    const engFlag = document.getElementById('eng-flag');
    console.log(rsFlag);
    
    console.log();
    
    rsFlag.onclick = () => changeFlag(rsFlag.value);
    engFlag.onclick = () => changeFlag(engFlag.value);
}

