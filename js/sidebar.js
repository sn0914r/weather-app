document.addEventListener("DOMContentLoaded",()=>{
    const sidebar = document.querySelectorAll('input[type="checkbox"][name="options"]');

    const getCurItems=()=>{
        let getItems_ls=[];
        sidebar.forEach(e=>{
            getItems_ls.push({
                val : e.value, isChecked : e.checked
            })
        })
        localStorage.setItem('wa_app', JSON.stringify(getItems_ls));
        return getItems_ls;
    }
    const updateHTML=(arr)=>{
        sidebar.forEach(e1=>{
            arr.forEach(e2=>{
                if (e1.value == e2.val){
                    if (e1.checked !== e2.isChecked){
                        e1.checked = e2.isChecked;
                    }
                }
            })
        })
    }
    const get_ls_update_html=()=>{
        const val = JSON.parse(localStorage.getItem('wa_app'));
        updateHTML(val);
        return val;
    }

    let getItems_ls = [];
    getItems_ls = localStorage.getItem('wa_app')?get_ls_update_html():getCurItems();

    const update_individual_item=(name, isChecked)=>{
        getItems_ls.some(e=>{
            if (name===e.val){
                e.isChecked = isChecked;
                localStorage.setItem('wa_app', JSON.stringify(getItems_ls));
                updateHTML(getItems_ls)
                return true;
            }
            return false;
        })
    }
    sidebar.forEach(e=>{
        e.addEventListener("change", e=>{
            update_individual_item(e.target.value, e.target.checked);
            console.log('event listener added');
            location.reload(true);
        })
    })
    
})
