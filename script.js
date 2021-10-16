let body = document.querySelector('body');
let toggle = document.querySelector('.night-shift');
let mainContent = document.querySelector(".mainContent");


toggle.addEventListener('click', () => {
    let text = document.querySelector('strong');
    let navDarkLight = document.querySelector('.nav');
    toggle.classList.toggle("on");
    let banners = document.querySelectorAll(".banner");
    banners.forEach(bnr=>bnr.classList.toggle("dark"));
    navDarkLight.classList.toggle('nav-dark');
    if (toggle.classList.contains('on')) {
        text.innerText='Dark Mode';
        body.style.background = "gray";
        body.style.color = "whitesmoke";
    }
    else {
        text.innerText='Normal Mode';
        body.style.background = "whitesmoke";
        body.style.color = "black";
    }
});

window.onload = () => {
    loadAllPhones();
}

function loadAllPhones() {
    fetch('https://api-mobilespecs.azharimm.site/v2/brands')
        .then(res => res.json())
        .then(res => {
            let obj = res.data;
            mainContent.innerHTML="<h4>List of mobile phone brands :</h4>";
            obj.forEach(element => {
                mainContent.innerHTML +=
                    `
                <div onclick="getBrand(this)" class=" row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8 banner">
                            <div class="col-md-6">
                            <h6>${element.brand_name}</h6>
                            </div>
                            <div class="col-md-5">
                            <h6>${element.device_count}</h6>
                            </div>
                            <div class="col-md-1" hidden>
                            <h6>Slug : ${element.brand_slug}</h6>
                            </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>

            `
            });
        })
}


let getBrand = function(obj){
    let slug = obj.querySelector('div:last-child').innerText;
    slug=slug.split(":")[1];
    fetch('https://api-mobilespecs.azharimm.site/v2/brands/'+slug)
        .then(res => res.json())
        .then(res=>{
            let obj = res.data;
            mainContent.innerHTML="<h4>"+obj.title+" :</h4>";
            obj.phones.forEach(element => {
                mainContent.innerHTML +=
                    `
                <div onclick="getPhone(this)" class=" row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8 banner">
                            <div class="col-md-4">
                                <label hidden>${element.slug}</label>
                                <img src="${element.image}"><img>
                            </div>
                            <div class="offset-4 col-md-4">
                            <h3>${element.phone_name}</h3>
                            </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
                `

            });
        });

}

let getPhone = function(obj){
    let slug = obj.querySelector('label').innerText;
    fetch(`http://api-mobilespecs.azharimm.site/v2/${slug}`)
        .then(res => res.json())
        .then(res=>{
            let obj = res.data;
            mainContent.innerHTML="<h4>"+obj,typeof(obj),obj.brand+" :</h4>";
            mainContent.innerHTML="<h4>"+obj.brand+" :</h4>";
                mainContent.innerHTML +=
                    `
                    <div class="row userInfoComponent">
                    <div class="col-md-4">
                        <div class="profileImg my-3">
                            <img src="${obj.thumbnail}" alt="profile">
                        </div>
                        <div class="mainInfo">
                            <h1>${obj.brand}</h1>
                            <span>${obj.release_date}</span>
                            <ul>
                    
                                <li>Last Updated:-${obj.os}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn btn-outline-success btn-block my-4" onclick="loadAllPhones();">See all Phones</button>
                                <div class="personalInfo">
                                    <h2>Specifications :</h2>
                                    <span>Storage:-${obj.storage}</span>
                                    <span>Display:-${obj.specifications[3].specs[0].val[0]}</span>
                                    <span>Display Specs:-${obj.specifications[3].specs[1].val[0]}</span>
 
                                
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="personalInfo">
                                <span class="pt-5">OS version - ${obj.specifications[4].specs[0].val[0]}</span>
                                <span>Memory - ${obj.specifications[5].specs[0].val[0]}</span>
                                <span>Rear camera - ${obj.specifications[6].specs[0].val[0]}</span>
                                <span>Front Camera - ${obj.specifications[7].specs[0].val[0]}</span>
                                <span>Stereo - ${obj.specifications[8].specs[0].val[0]}</span>
                                <span>WIFI - ${obj.specifications[9].specs[0].val[0]}</span>
 
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>;
                `
                startSlideShow(obj.phone_images);

        });

}

function startSlideShow(arr){
    let slideImg = document.querySelector(".profileImg img");
    let count = 0;
    setInterval((slideimg)=>{
        if(count>=arr.length)
        count=0;
        else{
            console.log(arr[count]);
            slideImg.setAttribute('src',arr[count]);
            count++;
        }
    },5000);
}

