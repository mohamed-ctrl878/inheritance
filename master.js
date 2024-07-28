if(sessionStorage.getItem("here")){
    document.getElementById("pop").style.display ="none"
    
}else{
    document.getElementById("pop").style.display ="block"
}


class FamilyTree {
    static husband = false;
    static father = false;
    static mother = false;
    static SonsMales = false;
    static SonsFemales = false;
    static Brothers = 0;
    static wife = 0;
  constructor(value, gender,number ) {
    this.value = value;
    this.number = number;
    this.gender = gender;
    this.children = [];
    }
    addChild(node) {
        this.children.push(node);
    }
}




let sonNon = document.getElementsByClassName("son-non");
let fatherNon = document.getElementsByClassName("father-non");
let husbandNon = document.getElementsByClassName("husband-non");
let uncleNon = document.getElementsByClassName("uncle-non");
let motherNon = document.getElementsByClassName("mother-non");
// let fatherNon = document.getElementsByClassName("uncle-non");
let inhers = document.querySelector(".inhers");
let span = document.querySelectorAll(".inhers span");
// get Elements
let next = document.querySelector(".next");
let members = document.querySelectorAll(".members .hers");
let arrayFromChoice = [];
let FAMILYROOT = new FamilyTree("family",0);
let sonsROOT = new FamilyTree("sons",0);
let fathersROOT = new FamilyTree("fathers",0);
let brothersROOT = new FamilyTree("brothers",0);
let husbandROOT = new FamilyTree("husband",0);
let wifeROOT = new FamilyTree("wife",0);
let punclesROOT = new FamilyTree("puncles",0);
let munclesROOT = new FamilyTree("muncle",0);
FAMILYROOT.addChild(sonsROOT);
FAMILYROOT.addChild(fathersROOT);
FAMILYROOT.addChild(brothersROOT);
FAMILYROOT.addChild(punclesROOT);
FAMILYROOT.addChild(munclesROOT);
FAMILYROOT.addChild(husbandROOT);
FAMILYROOT.addChild(wifeROOT);
//declaration & implementaion functions
function addBranch(root,arrayFromChoice, length,zero){
    if(zero == length)return;
    let branch = new FamilyTree(arrayFromChoice[zero],arrayFromChoice[zero] == "father" || arrayFromChoice[zero] == "son" || arrayFromChoice[zero] == "paternal uncle" || arrayFromChoice[zero] == "wife" || arrayFromChoice[zero] == "brother"?"male": "female");
    root.addChild(branch);
    addBranch(branch, arrayFromChoice, length, zero + 1);
}
function removeAllNones(el){
    Array.from(el).forEach((e)=>{
        e.style.display = "flex";
        e.parentElement.style.position = "relative"
        e.parentElement.style.left = "0"
    })
}

function goToNext(){
    if(arrayFromChoice.length > 0){
        removeAllNones(sonNon);
        removeAllNones(fatherNon);
        removeAllNones(document.querySelectorAll(".orign"));
    if(FamilyTree.wife ==4){
        document.querySelector(".wife").parentElement.remove();
        FamilyTree.wife +=1
    }
    if(FamilyTree.husband){
        document.querySelector(".husband").parentElement.remove();
        FamilyTree.husband = false
    }
    if(arrayFromChoice[arrayFromChoice.length-1] == "son" || arrayFromChoice[arrayFromChoice.length-1] == "daughter"){
        addBranch(sonsROOT,arrayFromChoice, arrayFromChoice.length,zero);
        if(arrayFromChoice[0] == "son"){
            FamilyTree.SonsMales=true
        }else{
            FamilyTree.SonsFemales = true
        }
    }
    else if(arrayFromChoice[arrayFromChoice.length-1] == "father"){
        addBranch(fathersROOT,arrayFromChoice, arrayFromChoice.length,zero);
        if(arrayFromChoice.length == 1){
            FamilyTree.father = true;
        }
    }
    else if(arrayFromChoice[arrayFromChoice.length-1] == "mother"){
        addBranch(fathersROOT,arrayFromChoice, arrayFromChoice.length,zero);
        if(arrayFromChoice.length == 1){
            FamilyTree.mother = true;
        }
    }
    else if(arrayFromChoice[arrayFromChoice.length-1] == "sister" ||arrayFromChoice[arrayFromChoice.length-1] == "brother"){
        addBranch(brothersROOT,arrayFromChoice.reverse(), arrayFromChoice.length,zero);
        if(arrayFromChoice.length == 1){
            FamilyTree.Brothers+=1;
        }
    }
    else if(arrayFromChoice[arrayFromChoice.length-1] == "paternal uncle" ||arrayFromChoice[arrayFromChoice.length-1] == "paternal aunt"){
        addBranch(punclesROOT,arrayFromChoice.reverse(), arrayFromChoice.length,zero);
    }
    else if(arrayFromChoice[arrayFromChoice.length-1] == "maternal uncle" ||arrayFromChoice[arrayFromChoice.length-1] == "maternal aunt"){
        addBranch(munclesROOT,arrayFromChoice, arrayFromChoice.length,zero);
    }
    else if(arrayFromChoice[arrayFromChoice.length-1] == "husband"){
        addBranch(husbandROOT,arrayFromChoice, arrayFromChoice.length,zero);
    }else if(arrayFromChoice[arrayFromChoice.length-1] == "wife" ){
        addBranch(wifeROOT,arrayFromChoice, arrayFromChoice.length,zero);
    }
    let span = document.createElement("span");
    inhers.appendChild(span);
    textNode = "";
    arrayFromChoice = [];
    }
}
function desplayNone(el, g){
    if(g == "male" ||g == "female" ){
        if(g == "male"){
            document.getElementsByClassName("wife")[0].classList.add("mother-non","father-non" ,"son-non", "orign")
        }else{
            document.getElementsByClassName("husband")[0].classList.add("mother-non","father-non" ,"son-non", "orign")
        }
        el.style.display = "none"
        el.parentElement.style.position = "absolute"
        el.parentElement.style.left = "-99999999px"
    }
    Array.from(el).forEach((e)=>{
        e.style.display = "none"
        e.parentElement.style.position = "absolute"
        e.parentElement.style.left = "-99999999px"
    })
}
function garbageElements(el){
    if(el !="orign" &&(el.currentTarget.innerHTML == "son" || el.currentTarget.innerHTML == "daughter")){
        desplayNone(sonNon)
    }
    else if(el !="orign" &&(el.currentTarget.innerHTML == "husband" || el.currentTarget.innerHTML == "wife")){
        desplayNone(husbandNon)
    }
    else if(arrayFromChoice[1] == "father"){
        desplayNone(motherNon)
    }
    else if(arrayFromChoice[1] == "mother"){
        desplayNone(fatherNon)
    }
    else if(el == "orign"){
        desplayNone(document.querySelectorAll(".orign"))
    }
}
function scrollToLastElement(){
    inhers.scrollTo({
        top:"0",
        left:`${inhers.scrollWidth}`,
        behavior:"smooth"
    })
}
//declaration & implementaion functions


let textNode = document.createTextNode("");
textNode = "";
let zero = 0;

members.forEach((e)=>{
    e.addEventListener("click", (el)=>{
        textNode += `${textNode.length == 0 ?"" :" "}${el.currentTarget.innerHTML}`;
        arrayFromChoice.push(el.currentTarget.innerHTML);
        inhers.lastElementChild.innerHTML =  textNode;
        if(el.currentTarget.innerHTML == "mother" || el.currentTarget.innerHTML == "father"){
            garbageElements("orign")
        }
        if(el.currentTarget.innerHTML == "paternal uncle" || el.currentTarget.innerHTML == "paternal aunt"|| el.currentTarget.innerHTML == "maternal uncle" || el.currentTarget.innerHTML == "maternal aunt" )goToNext();
        if(el.currentTarget.innerHTML == "husband" ){
            FamilyTree.husband = true;
            goToNext();
        }
        if(el.currentTarget.innerHTML == "wife" ){
            FamilyTree.wife +=1;
            goToNext();
        }
        if(el.currentTarget.innerHTML == "brother" ||el.currentTarget.innerHTML == "sister"){
            goToNext()
        }
        garbageElements(el)
        scrollToLastElement()
    })
})

next.addEventListener("click", ()=>{
    goToNext();
})
// start result
let welth = 0;

let forod = {}
let esabat = {};
let arham = {};

// function for get results 

function getSon(param){
    for(branch of sonsROOT.children){
        let [ val, depth] = sonRecursion(branch.children[0],0);
        if(branch.value == param && param == "daughter"){
            if(val){
                if(!forod[param])forod[param]=[];
                if(forod[param].length == 0){
                    forod[param][0] = {
                        val:1,
                        depth:depth
                    }
                }else{
                    let ifCoice = false
                    for(daut of forod[param]){
                        if(daut.depth == depth){
                            daut.val+=1;
                            ifCoice = true ;  
                        }
                    }
                    if(ifCoice == false){
                        forod[param][forod[param].length] = {
                            val:1,
                            depth:depth
                        }
                    }
                }
        
            }
        }else if(branch.value == param && param == "son"){
            if(val){
                if(!esabat[param]){esabat[param]=[]};
                if(esabat[param].length == 0){
                    esabat[param][0] = {
                        val:1,
                        depth:depth
                    }
                }else{
                    let ifCoice = false
                    for(daut of esabat[param]){
                        if(daut.depth == depth){
                            daut.val+=1;
                            ifCoice = true ;  
                        }
                    }
                    if(ifCoice == false){
                        esabat[param][esabat[param].length] = {
                            val:1,
                            depth:depth
                        }
                    }
                }
        
            }
        }
        
    }
}
function getHusband(){
    if(wifeROOT.children.length > 0 && wifeROOT.children[0].value == "wife"){
        forod.wife = wifeROOT.children.length
    }
    if( husbandROOT.children.length > 0 &&husbandROOT.children[0].value == "husband"){
        forod.husband = true;
    }
}
function getToResultObjects(){
    getHusband()
    getSon("daughter")
    getBrorther()
    getFathers()
}
function  sonRecursion(branch, idx){
    if(branch == undefined){return [true, idx]};
    if(branch.gender == "female"){return [false, idx]};
    return sonRecursion(branch.children[0], idx + 1);
}
function getBrorther(){
for(branch of brothersROOT.children){
    if(branch.value == "sister" && branch.children.length == 0){
        if(forod.sister){
            forod.sister +=1;
        }else{
            forod.sister =1;
        }
    }else if(branch.value == "brother"){
           let [val, depth] =  sonRecursion(branch.children[0], 0);
            if(val){
                if(!esabat.brother)esabat.brother=[];
                if(esabat.brother.length == 0){
                    esabat.brother[0] = {
                        val:1,
                        depth:depth
                    }
                }else{
                    let ifCoice = false
                    for(daut of esabat.brother){
                        if(daut.depth == depth){
                            daut.val+=1;
                            ifCoice = true ;  
                        }
                    }
                    if(ifCoice == false){
                        esabat.brother[esabat.brother.length] = {
                            val:1,
                            depth:depth
                        }
                    }
                }
        
            }
        
    }
}
}
function getFathers(){
for(branch of fathersROOT.children){
    if(branch.value == "father" && branch.children.length == 0){
        if(!forod.father){
            forod.father = true;
        }
    }
    else if(branch.value == "mother" && branch.children.length == 0){
        if(!forod.mother){
            forod.mother = true;
        }
    }
    else if (branch.value == "mother" && branch.children[0].value =="mother"){
        const depth = fathersFard(branch.children[0], 0)
        let foundDepthInObj = false;
        console.log(branch.children[0].value);
        if(!forod.motherMother)forod.motherMother = [];

        for(el of forod.motherMother){

            if(el.depth == depth){
                foundDepthInObj = true
            }

        }

        if(!foundDepthInObj){
            forod.motherMother[forod.motherMother.length] = {
                depth:depth
            }
        }
    }
    else if (branch.value == "father" && branch.children[0].value =="mother"){
        const depth = fathersFard(branch.children[0], 0)
        let foundDepthInObj = false;
        console.log(branch.children[0].value);
        if(!forod.fatherMother)forod.fatherMother = [];

        for(el of forod.fatherMother){

            if(el.depth == depth){
                foundDepthInObj = true
            }

        }

        if(!foundDepthInObj){
            forod.fatherMother[forod.fatherMother.length] = {
                depth:depth
            }
        }
    }
    else if (branch.value == "father" && branch.children[0].value =="father"){
        const depth = fathersFard(branch.children[0], 0)
        let foundDepthInObj = false;
        console.log(branch.children[0].value);
        if(!forod.fatherFather)forod.fatherFather = [];

        for(el of forod.fatherFather){

            if(el.depth == depth){
                foundDepthInObj = true
            }

        }

        if(!foundDepthInObj){
            forod.fatherFather[forod.fatherFather.length] = {
                depth:depth
            }
        }
    }
    else if (branch.value == "mother" && branch.children[0].value =="father"){
        const depth = fathersFard(branch.children[0], 0)
        let foundDepthInObj = false;
        console.log(branch.children[0].value);
        if(!forod.motherFather)forod.motherFather = [];

        for(el of forod.motherFather){

            if(el.depth == depth){
                foundDepthInObj = true
            }

        }

        if(!foundDepthInObj){
            forod.motherFather[forod.motherFather.length] = {
                depth:depth
            }
        }
    }
}
}

function fathersFard(branch, idx){
    if(branch == undefined)return idx;
    return fathersFard(branch.children[0], idx + 1);
}
function getUncles(){
    for(branch of punclesROOT.children){

    if(branch.value == "paternal uncle"){
        let [val, depth] =  sonRecursion(branch.children[0], 0);
         if(val){
             if(!esabat.puncles)esabat.puncles=[];
             if(esabat.puncles.length == 0){
                 esabat.puncles[0] = {
                     val:1,
                     depth:depth
                 }
             }else{
                 let ifCoice = false
                 for(daut of esabat.puncles){
                     if(daut.depth == depth){
                         daut.val+=1;
                         ifCoice = true ;  
                     }
                 }
                 if(ifCoice == false){
                     esabat.puncles[esabat.puncles.length] = {
                         val:1,
                         depth:depth
                     }
                 }
             }
     
         }
     
 }
}
}
// function for get results 
// function for get results ASABAT
function asabat(){
    getSon("son")
    getUncles()
}
// function for get results ASABAT



let stringResult=[];

function sonResult(){
    let bigNum = Number.MAX_SAFE_INTEGER;
    let dtr = bigNum;
    let sn = bigNum;
    let i =0 
    if(forod.daughter){
    for(let c = 0;c < forod.daughter.length; c++){
        if(forod.daughter[c].depth <= dtr){
            dtr = forod.daughter[c].depth;
            i = c;
        }
    }
    }
    let j =0 
    if(esabat.son){
    for(let a = 0;a < esabat.son.length; a++){
        if(esabat.son[a].depth <= sn){
            sn = esabat.son[a].depth;
            j =a;
        }
    }
    }
    if(dtr != bigNum || sn != bigNum ){
        if(dtr != bigNum && sn >= dtr){
                if(dtr == sn){
                    stringResult.push({name:`daughter${forod.daughter[i].val == 1?"":`(${forod.daughter[i].val})`}${" of son ".repeat(dtr)}`,welth:"Association, the male has twice the female"})
                    stringResult.push({name:`son${esabat.son[j].val == 1?"":`(${esabat.son[j].val})`}${" of son ".repeat(sn)}`,welth:`Association, the male has twice the female`})
                }
                else {
                    if(forod.daughter[i].val == 1){
                    stringResult.push({name:"daughter",welth:1/2});
                    welth+=1/2;
                    if(sn == bigNum){
                        let choice = false;
                        for(let d = 0 ; d < forod.daughter.length; d++){
                            if(d == i)continue;
                            if(forod.daughter[d].val == 1){
                                stringResult.push({name:"daughter"+" of son ".repeat(forod.daughter[d].depth),welth:"All of the son's daughters are partners in 1/6 if they are found"})
                            }else{
                                stringResult.push({name:`daughter(${forod.daughter[d].val})`+" of son ".repeat(forod.daughter[d].depth),welth:"All of the son's daughters are partners in 1/6 if they are found"})
                            }
                            choice = true
                        }   
                        if(choice)welth+=1/6
                    }
                }else{
                    stringResult.push({name:`daughter(${forod.daughter[i].val})`,welth:2/3})
                    welth+=2/3;
                }
                if(sn != bigNum){
                    let choice =false;
                    for(let a= 0; a < forod.daughter.length; a++){
                        if(a == i)continue;
                            stringResult.push({name:`daughter${forod.daughter[a].val == 1?"":`(${forod.daughter[a].val})`}${" of son ".repeat(forod.daughter[a].depth)}`,welth:"Association, the male has twice the female"})
                            choice = true;
                    }
                    stringResult.push({name:`son${esabat.son[j].val == 1?"":`(${esabat.son[j].val})`}${" of son ".repeat(sn)}`,welth:`Association${choice?`, the male has twice the female`:""}`})
                }
            }
            
        }else if(sn != bigNum){
            stringResult.push({name:`son${esabat.son[j].val == 1?"":`(${esabat.son[j].val})`}${" of son ".repeat(sn)}`,welth:`Association`})
        }
    }
}

function fatherRes(){
    if(FamilyTree.SonsMales){
        if(forod.father){
            stringResult.push({name:`father`,welth:1/6})
            welth +=1/6
        }
    }
    else if(FamilyTree.SonsFemales){
        if(forod.father){
            stringResult.push({name:`father`,welth:`1/6${welth+1/6 >= 1?"":", Association"}`})
            welth +=1/6
        }
    }else{
        if(forod.father && welth < 1){
            stringResult.push({name:`father`,welth:"Association"})
        }
    }
    if(forod.mother){
        if(!FamilyTree.SonsFemales &&!FamilyTree.SonsFemales &&FamilyTree.Brothers <=1){
            if(forod.father && (forod.husband || forod.wife)){
                stringResult.push({name:`mother`,welth:`1/3 welth after${forod.husband?" husband":forod.wife > 1?` wife(${forod.wife})`:" wife"}`})
                welth+=1/3;
            }else{
            stringResult.push({name:`mother`,welth:1/3})
            welth+=1/3;
            }
        }else{
            stringResult.push({name:`mother`,welth:1/6})
            welth+=1/6;
        }
    }
    // in mother mother or father fahter, chick first about FamilyTree.mother && FamilyTree.father
}

function huswife(){
    if(!FamilyTree.SonsMales &&!FamilyTree.SonsFemales){
        if(forod.husband){
            stringResult.push({name:`husband`,welth:1/2})
            welth+=1/2;
        }
        if(forod.wife){
            stringResult.push({name:`wife${forod.wife > 1 ?`(${forod.wife})`:``}`,welth:1/4})
            welth+=1/4;
        }
    }else{
        if(forod.husband){
            stringResult.push({name:`husband`,welth:1/4})
            welth+=1/4;
        }
        if(forod.wife){
            stringResult.push({name:`wife${forod.wife > 1 ?`(${forod.wife})`:``}`,welth:1/8})
            welth+=1/8;
        }
    }
}
function deepMother(){
    let motherMother = Number.MAX_SAFE_INTEGER;
    let motherFather = Number.MAX_SAFE_INTEGER;
    let fatherFather = Number.MAX_SAFE_INTEGER;
     if(!FamilyTree.mother){
        if(forod.motherMother){
            for(br of forod.motherMother){
                if(br.depth < motherMother){
                    motherMother = br.depth;
                }
            }
        }
        if(!FamilyTree.father){
            if(forod.motherFather){
                for(br of forod.motherFather){
                    if(br.depth < motherFather){
                        motherFather = br.depth;
                    }
                }
            }
            if(forod.fatherFather){
                for(br of forod.fatherFather){
                    if(br.depth < fatherFather){
                        fatherFather = br.depth;
                    }
                }
            }
        }
    
        if(motherMother != Number.MAX_SAFE_INTEGER && motherFather > motherMother){
            stringResult.push({name:`mother${` of mother`.repeat(motherMother)}`,welth:1/6})
            welth+=1/6;
        }else if(motherMother != Number.MAX_SAFE_INTEGER || motherFather != Number.MAX_SAFE_INTEGER){
            if(motherFather <= fatherFather){
                if(motherFather == motherMother){
                    stringResult.push({name:`mother${` of mother`.repeat(motherMother)}`,welth:`half of 1/6 with mother${` of father`.repeat(motherFather)}`})
                    stringResult.push({name:`mother${` of father`.repeat(motherFather)}`,welth:`half of 1/6 with mother${` of mother`.repeat(motherMother)}`})
                    welth+=1/6;
                }else if(motherFather < motherMother){
                    stringResult.push({name:`mother${` of father`.repeat(motherFather)}`,welth:1/6})
                    welth+=1/6;
                }
            }
        }
    }
}
let brotherAssoca = false;
let sisFard = false;
function sisterRes(){
    if(!FamilyTree.SonsMales &&!FamilyTree.father){
        let brother = Number.MAX_SAFE_INTEGER;
        let sonBrother = [Number.MAX_SAFE_INTEGER,0];
            if(esabat.brother){
                for(let i = 0;i < esabat.brother.length; i++){
                    if(esabat.brother[i].depth == 0){
                        brother = i;
                    }else if(esabat.brother[i].depth < sonBrother[0]){
                        sonBrother[0] = esabat.brother[i].depth;
                        sonBrother [1]= i;
                    }
                }
            }
            if(forod.sister){
                if(brother != Number.MAX_SAFE_INTEGER && welth < 1){
                    brotherAssoca =true;
                    stringResult.push({name:`brother${esabat.brother[brother].val == 1?"":"(s)"}`,welth:"Association, the male has twice the female"})
                    stringResult.push({name:`sister${forod.sister == 1?"":"(s)"}`,welth:"Association, the male has twice the female"})
                }else{
                    if(FamilyTree.SonsFemales && !forod.fatherFather && welth < 1){
                        brotherAssoca =true;
                        stringResult.push({name:`sister${forod.sister > 1?"(s)":""}`,welth:"Association"})// back here to check about father father .... 
                    }else{
                        if(forod.sister == 1){
                            stringResult.push({name:`sister`,welth:1/2})
                            welth+=1/2
                            sisFard = true
                        }else{
                            stringResult.push({name:`sister(s)`,welth:2/3})
                            welth+=2/3
                            sisFard = true
                        }
                    }
                }
        }else if(brother != Number.MAX_SAFE_INTEGER && welth < 1){
            brotherAssoca =true;
            stringResult.push({name:`brother${esabat.brother[brother].val == 1?"":"(s)"}`,welth:"Association"})
            }else if(sonBrother[0]!= Number.MAX_SAFE_INTEGER && welth < 1){
                brotherAssoca =true;
                let repeating = esabat.brother[sonBrother[1]].depth -1;
                stringResult.push({name:`son${esabat.brother[sonBrother[1]].val == 1?"":"(s)"}${" of son".repeat(repeating < 1?0:repeating )} of brother`,welth:"Association"})
            }
    }
}

function deepFather(){
    let yngFather = Number.MAX_SAFE_INTEGER;
    if(!FamilyTree.father){
        if(forod.fatherFather){
            for(branch of forod.fatherFather){
                if(branch.depth < yngFather){
                    yngFather = branch.depth
                }
            }
        if(FamilyTree.SonsMales){
            stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:1/6})
            welth+=1/6;
        }else if(FamilyTree.SonsFemales && !brotherAssoca){
            stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:1/6 +`${welth < 1 ? "Association":""}`})
        }else if( !brotherAssoca && !FamilyTree.SonsFemales){
            if(!sisFard){
                stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:`Association`})
            }else{
                stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:1/6})
                welth +=1/6
            }
        }else{
            let sister = 0;
            let brother =0;
            sister = forod.sister?forod.sister:0;
            if(esabat.brother){
                for(branch of esabat.brother){
                    if(branch.depth != 0)continue;
                    brother = branch.val
                }
            }
            if(forod.daughter || forod.wife || forod.husband || forod.mother || forod.motherMother){
                let sixth = 1/6;
                let third = 1/3 * (1 - welth);
                brother+=1;
                let fath
                let check = false;
                if(sister!=0){
                    brother*=2;
                     fath = (2 / (brother + sister) * (1 - welth))
                     check= true
                }else{
                     fath =( 1 / brother) * (1 - welth);
                }
                if(sixth > third && sixth > fath){
                    stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:1/6})
                    welth+=sixth
                }else if(third > sixth && third > fath){
                    stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:"1/3 of the rest"})
                    welth+=third
                }else if(welth < 1){
                    stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:`Association${check?`, the male has twice the female with brother or sister or both`:''}`})

                }
            }else if(welth < 1){
                brother+=1;
                let fath
                let check = false;
                if(sister!=0){
                    brother*=2;
                     fath = 2 / (brother + sister)
                     check= true
                }else{
                     fath = 1 / brother;
                }
                stringResult.push({name:`father${` of father`.repeat(yngFather)}`,welth:fath > 1/3?`Association${check?`, the male has twice the female with brother or sister or both`:''}`:1/3})
                if(fath < 1/3){
                    welth +=1/3
                }
            }
        }
        
        }
    }

}

function puncles(){
    if(!brotherAssoca && ! FamilyTree.father && !forod.fatherFather && !FamilyTree.SonsMales ){
        let ifFoundZeroUncle = false;
        let fristSonOfuncles = [Number.MAX_SAFE_INTEGER,0];
        if(esabat.puncles){
            for(let i = 0; i < esabat.puncles.length; i++ ){
                if(esabat.puncles[i].depth != 0 ){
                    if(esabat.puncles[i].depth < fristSonOfuncles[0] ){
                        // fristSonOfuncles هنا علط لانك بتحط قيمة الi وبترجع تتشيك فى اللوب اللى بعده احذر 
                        fristSonOfuncles[0] = esabat.puncles[i].depth;
                        fristSonOfuncles[1] = i;
                    }
                }else if(welth < 1){
                    ifFoundZeroUncle = true;
                    stringResult.push({name:`paternal uncle${esabat.puncles[i].val > 1?"(s)":""}`,welth:`Association`})
                }

            }
            if(!ifFoundZeroUncle && fristSonOfuncles[0]!=Number.MAX_SAFE_INTEGER && welth < 1){
                stringResult.push({name:`son${esabat.puncles[fristSonOfuncles[1]].val > 1?"(s)":""}${`of son`.repeat(fristSonOfuncles[0] - 1)} of paternal uncle`,welth:`Association`})

            }
        }

    }
}


// popup and choice who is dead part
let arr = [  0, "-110%", "-220%", "end"];
let point = 0;
let transition = document.getElementsByClassName("transition")[0]
let popUpHint = document.getElementsByClassName("popup")[0]
let nestbtn = document.getElementsByClassName("nest")[0]
let prevbtn = document.getElementsByClassName("prev")[0]
let choicePopup = document.getElementsByClassName("choice")[0]
let male = document.querySelector(".choice .male")
let female = document.querySelector(".choice .female")

let choiceMale = document.getElementsByClassName("choice-mele")[0]
let choiceFemale = document.getElementsByClassName("choice-female")[0]
let parentMale = choiceMale.parentElement;
let parentFemale = choiceFemale.parentElement;
function slider(point) {
if(arr[point] == "end"){
    sessionStorage.setItem("here","true");
    popUpHint.style.display = "none"
}else{
    transition.style.left = arr[point]
}
    return point
}
nestbtn.addEventListener("click", ()=>{
   point =  slider(point+1);
})
prevbtn.addEventListener("click", ()=>{
    if(point !=0)
   point =  slider(point-1);
})
male.addEventListener("click", ()=>{
    deadSellect("male")
})
female.addEventListener("click", ()=>{
    deadSellect("female")
})


console.log(choiceMale)


function deadSellect(gender){
    if(gender == "male"){
        document.getElementsByClassName("choice-mele")[0].parentElement.remove()
    }else{
        document.getElementsByClassName("choice-female")[0].parentElement.remove()
    }
    choicePopup.style.display = "none"
}











// table results
let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let tfoot = document.createElement('tfoot');
let tr = document.createElement("tr");
let th = document.createElement("th");
let td = document.createElement("td");
// table results


function addTable(stringResult) {
    if (stringResult.length > 0) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let tfoot = document.createElement('tfoot');

        table.className = "table";
        thead.className = "table-head";
        tbody.className = "table-body";
        tfoot.className = "table-footer";

        let trh = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.innerHTML = "Person";
        trh.appendChild(th1);

        let th2 = document.createElement('th');
        th2.innerHTML = "Him Wilth";
        trh.appendChild(th2);

        thead.appendChild(trh);
        table.appendChild(thead);

        // إنشاء صفوف الجسم وإضافة خلايا البيانات
        let assc = false;
        for (let branch of stringResult) {
            let trb = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.innerHTML = branch.name;
            trb.appendChild(td1);

            let td2 = document.createElement('td');
            if (branch.welth == 1 / 8) {
                td2.innerHTML = "1/8";
            } else if (branch.welth == 1 / 6) {
                td2.innerHTML = "1/6";
            } else if (branch.welth == 1 / 4) {
                td2.innerHTML = "1/4";
            } else if (branch.welth == 1 / 3) {
                td2.innerHTML = "1/3";
            } else if (branch.welth == 1 / 2) {
                td2.innerHTML = "1/2";
            } else if (branch.welth == 2 / 3) {
                td2.innerHTML = "2/3";
            } else if (branch.welth.includes("Association")) {
                td2.innerHTML = branch.welth;
                assc = true;
            } else {
                td2.innerHTML = branch.welth;
            }
            trb.appendChild(td2);
            tbody.appendChild(trb);
        }
        table.appendChild(tbody);

        let trf = document.createElement('tr');
        let tdf = document.createElement('td');
        tdf.colSpan = 2; 
        tdf.innerHTML = assc && welth !=1 ? "" : "Each person takes a share according to the share estimated for him";
        trf.appendChild(tdf);
        tfoot.appendChild(trf);
        table.appendChild(tfoot);
        let lastResult = document.getElementsByClassName("results")[0]
        lastResult.appendChild(table);
        lastResult.style.display= "block"
        let Backbtn = document.getElementsByClassName("btn-back")[0]
        Backbtn.addEventListener("click", ()=>{
            
        })
    }
}

document.getElementsByClassName("btn-back")[0].addEventListener("click",(e)=>{
        let lastResult = document.getElementsByClassName("results")[0]
            table.remove()
            lastResult.style.display= "none"
            choicePopup.style.display="flex"
            removeAllNones(sonNon);
            removeAllNones(fatherNon);
            removeAllNones(document.querySelectorAll(".orign"));
            const member = document.getElementsByClassName("member")[0];
            const children = member.children;
            const insertBeforeElement = children[children.length - 2];
            if(!document.getElementsByClassName("wife")[0]){
                member.insertBefore(parentFemale, insertBeforeElement);
            }
            if(!document.getElementsByClassName("husband")[0]){
                member.insertBefore(parentMale, insertBeforeElement);
            }
            removeMemo()
            inhers.innerHTML = "<span></span>";
    
})
document.querySelector(".result").addEventListener("click", ()=>{
    getToResultObjects()
    asabat()
    sonResult()
    fatherRes()
    huswife()
    sisterRes()
    deepMother()
    deepFather()
    puncles()
    addTable(stringResult,table,thead,tbody,tfoot,tr,tr,tr,th,td)
})

function removeMemo(){
    stringResult = []
    forod ={}
    esabat ={}
    textNode = ""
    document.querySelector(".results table").remove()
    removeChildsFromRoots(sonsROOT)
    removeChildsFromRoots(fathersROOT)
    removeChildsFromRoots(brothersROOT)
    removeChildsFromRoots(husbandROOT)
    removeChildsFromRoots(wifeROOT)
    removeChildsFromRoots(punclesROOT)
    punclesROOT = new FamilyTree("puncles",0);
    wifeROOT = new FamilyTree("wife",0);
    husbandROOT = new FamilyTree("husband",0);
    brothersROOT = new FamilyTree("brothers",0);
    fathersROOT = new FamilyTree("fathers",0);
    sonsROOT = new FamilyTree("sons",0);
    FamilyTree.husband = false;
    FamilyTree.father = false;
    FamilyTree.mother = false;
    FamilyTree.SonsMales = false;
    FamilyTree.SonsFemales = false;
    FamilyTree.Brothers = 0;
    FamilyTree.wife = 0;
    brotherAssoca = false;
    sisFard = false;
    welth = 0;
}
// popup and choice who is dead part

function removeChildsFromRoots(root){
    if(root){
        removeChildsFromRoots(root.children[0])
        root.value = null;
        root.children = null;
        root.gender = null;
        root.children = null;
    } 
}


// let FAMILYROOT = new FamilyTree("family",0);
// let sonsROOT = new FamilyTree("sons",0);
// let fathersROOT = new FamilyTree("fathers",0);
// let brothersROOT = new FamilyTree("brothers",0);
// let husbandROOT = new FamilyTree("husband",0);
// let wifeROOT = new FamilyTree("wife",0);
// let punclesROOT = new FamilyTree("puncles",0);
// let munclesROOT = new FamilyTree("muncle",0);