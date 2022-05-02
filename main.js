//final project (Resume Dash) -Robert Hubert





const API_KEY = '49278d25-f81c-4282-ac3a-fbf33257a327';
const l = (arg) => console.log(arg)//shorthand for console.log, thank you jason Bradley!

//Create New Resume button
document.querySelector('#create_button').addEventListener('click',function(){

    document.querySelector('#home_screen').style['transform'] = 'translateY(-110vh)';
    localStorage.setItem('resume_data','{}')

    localStorage.setItem('color','{}')

    setTimeout(function(){

        document.querySelector('#home_screen').style['display']='none';
        document.querySelector('#main_page').style['display']='block';
        document.querySelector('#create_page').style['display']='block';
        document.querySelector('#create').style['font-weight'] = 'bolder';
    }, 0980)
    

});

//Continue résumé button
document.querySelector('#continue_button').addEventListener('click',function(){

    document.querySelector('#home_screen').style['transform'] = 'translateY(-110vh)';

    setTimeout(function(){

        document.querySelector('#home_screen').style['display']='none';
        document.querySelector('#main_page').style['display']='block';
        document.querySelector('#resume_page').style['display']='block';
        document.querySelector('#resume').style['font-weight'] = 'bolder';
    }, 0980)
    
    populte_resume()
});



//ADD CONTACT INFO
document.querySelector('#contact_next').addEventListener('click',function(){

        document.querySelector('#create_page').style['display']='none';
        document.querySelector('#experience_page').style['display']='block';

        //adding years to dropdowns
        document.querySelectorAll('.year_selector').forEach((dropDown) => {
    
            update_years(dropDown);
        
          });

        //add data to local storage\
        let data = {};

        data['first_name'] = document.querySelector('#first_name').value;
        data['last_name'] = document.querySelector('#last_name').value;
        data['address'] = document.querySelector('#address').value;
        data['email'] = document.querySelector('#email').value;

        l(data);

        data =  JSON.stringify(data)
        localStorage.setItem('resume_data',data);



          
});


//ADD SKILLS
document.querySelector('#experience_next').addEventListener('click',function(){


    let data =JSON.parse(localStorage.getItem('resume_data'));
    let skills = [];

    data['job_name'] = document.querySelector('#new_job_name').value;
    data['start_date'] = document.querySelector('#start_month').value + ' ' + document.querySelector('#start_year').value;

    data['end_date'] = document.querySelector('#end_month').value + ' ' + document.querySelector('#end_year').value;

    document.querySelectorAll('.skill').forEach((skill) => {

            skills.push(skill.value);
    });
    data['skills']=skills;

    l(data);

    //save data
    data =  JSON.stringify(data)
    localStorage.setItem('resume_data',data);

    //open next page

    document.querySelector('#experience_page').style['display']='none';
    document.querySelector('#education_page').style['display']='block';
});

//ADD EDUCATION
document.querySelector('#education_next').addEventListener('click',function(){


    let data =JSON.parse(localStorage.getItem('resume_data'));

    data['school_name'] = document.querySelector('#school_name').value;
    data['grad_date'] = document.querySelector('#grad_month').value + ' ' + document.querySelector('#grad_year').value;

    l(data);

    //save data
    data =  JSON.stringify(data)
    localStorage.setItem('resume_data',data);

    //open next page

    document.querySelector('#education_page').style['display']='none';
    document.querySelector('#summary_page').style['display']='block';
});

//ADD SUMMARY
document.querySelector('#summary_next').addEventListener('click',function(){


    let data =JSON.parse(localStorage.getItem('resume_data'));
    data['summary'] = document.querySelector('#summary').value;
        
    //save data

    data =  JSON.stringify(data)
    localStorage.setItem('resume_data',data);


    //open next page

    document.querySelector('#summary_page').style['display']='none';
    document.querySelector('#resume_page').style['display']='block';

    //populate resume
    populte_resume();


    //toggle tab boldness
    document.querySelector('#create').style['font-weight'] = '';
    document.querySelector('#resume').style['font-weight'] = 'bolder';
});

//COLOR CONTROL
document.querySelector('#color_picker').addEventListener("input",(event)=>{
    
    document.querySelector('#left').style['background-color']= event.target.value;
    document.querySelectorAll('.res_title').forEach((title) => {

        title.style['border-color']= event.target.value;
    });

    localStorage.setItem('color', event.target.value);
    
 });


//TAB CONTROL
document.querySelectorAll('.header_link').forEach((tab) => {


    //add listener to each tab
    tab.addEventListener('click',function(){
        
        //remove boldness from all tabs
        document.querySelectorAll('.header_link').forEach((tab) => {
            tab.style['font-weight']= '';
        });

        //close all pages
        document.querySelectorAll('.page').forEach((page) => {
            page.style['display'] ='none';
        });

        //open page for tab selected
        document.querySelector('#'+tab.dataset.value).style['display']='block';
        
        //bold the selected tab
        tab.style['font-weight']= 'bolder';

    });
});


//functions
//adding dates to year selectors
function update_years(dropDown){

    for (let i = 0; i < 23; i++) {
        
        let op = document.createElement('option');
        op.innerText = 2000 + i;
        dropDown.appendChild(op);
        
    }
}
document.querySelectorAll('.year_selector').forEach((dropDown) => {
    
    update_years(dropDown)

  });


  function populte_resume() {
    
    let data =JSON.parse(localStorage.getItem('resume_data'));

    let email_fields = data['email'].split('@');
    document.querySelector('#resume_div').innerHTML =`

    <div id="top">
        <p id="name">${data['first_name']} ${data['last_name']}</p>
        <p >${data['address']}</p>
    </div>

    <div id="bottom">

        <div id="left">
            <p class="italic">
                " ${data['summary']} "
            </p>
            <p>Contact Info: ${email_fields[0]}@<br>${email_fields[1]}</p>
        </div>
        <div id="right">

            <p class="res_title">Work History</p>
            <p style="margin-bottom: 0px;">${data['job_name']}&emsp;&emsp;${data['start_date']} ~ ${data['end_date']}</p>
            <ul id="res_skills">
                <li>thing 1</li>
                <li>thing 2qqqqqqqqqqqqdef</li>
                <li></li>
                <li></li>
            </ul>

            <p class="res_title">Education</p>
            <p>${data['school_name']}&emsp; ${data['grad_date']}</p>
        </div>
    </div>`;

    let res_ul =document.querySelector('#res_skills');
    res_ul.innerHTML='';

    for (let i = 0; i < data['skills'].length; i++) {
        
        if(data['skills'][i] !='')
        {
            let new_li = document.createElement('li')
            new_li.innerText = data['skills'][i];

            res_ul.appendChild(new_li);
        }
    }

    //paint resume with colors from local storage
    document.querySelector('#left').style['background-color']= localStorage.getItem('color')
    document.querySelectorAll('.res_title').forEach((title) => {

        title.style['border-color']= localStorage.getItem('color')
    });
  };

  //GET JOB DATA
async function get_job_data()
{
    let httpResponse = await fetch('https://www.arbeitnow.com/api/job-board-api');
    let job_data = await httpResponse.json();

    l(job_data);
    let field = document.querySelector('#job_data_div');

    for (let i = 0; i < 19; i++) {
        
        job = document.createElement('div');

        job.innerHTML=`
        
            <img class="job_logo" src="a_logo.png" alt="">
            
            <p class="bold">${job_data.data[i]['company_name']}</p>
            <p>${job_data.data[i]['title']}</p>
        `;
        
        field.appendChild(job);
    }
    
};

get_job_data();

// check to see if user has already made a resume
if(localStorage.getItem('resume_data')=='{}'){
    document.querySelector('#continue_button').style['display']='none';
}