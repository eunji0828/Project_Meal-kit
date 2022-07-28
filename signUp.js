/*
================================================
220726 이은지 회원가입 정규표현식
       조건문 작성 
220727 성별 체크박스, date 선택 이벤트 속성 수정
       회원가입 버튼 클릭 시 조건 만족하면 
       로그인 페이지 이동
=================================================
*/

let id = document.querySelector('#id'); // input 아이디
let password = document.querySelector('#password'); // input 비밀번호
let pwConfirm = document.querySelector('#pwConfirm'); // input 비밀번호 재확인
let nameCheak = document.querySelector('#nameCheak'); // input 이름
let genderBox = document.querySelector('.genderBox'); // 성별
let birth = document.querySelector('#birth'); // 생년월일 날짜
let phone = document.querySelector('#phone'); // input 핸드폰 번호
let address = document.querySelector('#address'); // input 주소
let email = document.querySelector('#email'); // input 이메일
let btn = document.querySelector('.btn'); // 가입하기 버튼


const idInput = /^[a-zA-Z0-9]*$/;
// 아이디 - 영문(대,소문자상관없이) 숫자 작성해야함
const pwInput = /(?=.*\d)+(?=.*[~`!@#$%\^&*()-+=])+(?=.*[a-z])(?=.*[A-Z])+.{1,}$/;
// 비밀번호 - 영문(대,소문자), 특수문자, 숫자 1개 이상 작성해야함
const nameInupt = /^[a-zA-Z가-힣]*.{3,}$/;
// 이름 - 영어(대, 소문자 상관없이), 한글만 3글자 이상 작성해야함
const birthDay = /^[1-2]{1}[0-9]{3}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}$/;
// 생일 생년월일 앞자리 1-2 확인, 년도 3자리 작성, [0-1]{1}[0-9]{1} 01,12 같이 '월' 확인 [0-3]{1}[0-9]{1} '일' 확인
const phoneInput = /^01([0|1|6|7|8]?)-([0-9]{3,4})-([0-9]{4})$/;
// 핸드폰 - 번호 010,011,016,017,018 중에 작성, 중간번호(3~4자리), 끝 번호(4자리) 작성해야함
const addressInput = /(([가-힣A-Za-z·\d~\-\.]{2,}(로|길).[\d]+)|([가-힣A-Za-z·\d~\-\.]+(읍|동)\s)[\d]+)/;
// 주소 - 도로명주소, 지번 주소 작성해야함
const emailInput =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
// 이메일 - 주소 영문(대,소문자 상관없이)과 숫자 작성 
// @ 도메인주소 작성 시 .이 하나 이상 들어가야 하고 맨 뒤(com/net) 이기 때문에 2~3글자 작성해야함

const passCheck = /(pass){9,9}/;
// 가입하기 버튼 눌렀을 시 pass가 9개 들어있는지 확인

// nextElementSibling 다음 형제 요소 노드를 사용할 수 있도록 해주는 속성
// test() 메소드는 정규식과 특정 문자열 사이의 일치에 대한 검색을 수행 true 또는 false 반환

// 220727 가입하기 버튼을 눌렀을 때 전체 영역 조건 만족을 어떻게 확인해야할지 고민하다가
// 예전 성진님이 네이버 유효성검사 코드 작성한게 생각나 참고하였음
let flag = ['fail', 'fail', 'fail', 'fail', 'fail', 'fail', 'fail', 'fail', 'fail']
// 각 양식에 flag를 줘서 모두 pass가 될 경우 회원 가입 가능

// 아이디 확인
id.addEventListener("keyup",function(){
    if(id.value.length == 0){
        id.nextElementSibling.innerHTML="아이디를 입력하세요";
        id.nextElementSibling.style.color='red';
        flag[0] = 'fail';

    }else if(idInput.test(id.value) !== true){
        id.nextElementSibling.innerHTML="아이디는 영문과 숫자를 사용해주세요";
        id.nextElementSibling.style.color='red';
        flag[0] = 'fail';

    } else if(id.value.length>15 || id.value.length<5){
        id.nextElementSibling.innerHTML="아이디는 5~15자로 작성해주세요";
        id.nextElementSibling.style.color='red';
        flag[0] = 'fail';

    } else if(idInput.test(id.value)==true){
        id.nextElementSibling.innerHTML="사용 가능합니다";
        id.nextElementSibling.style.color='blue';
        flag[0] = 'pass';
    }
});

// 비밀번호 확인
password.addEventListener("keyup",function(){
   if(password.value.length==0){
    password.nextElementSibling.innerHTML="비밀번호를 입력하세요";
    password.nextElementSibling.style.color='red';
    flag[1] = 'fail';

   } else if(pwInput.test(password.value) ==! true){
    password.nextElementSibling.innerHTML="비밀번호는 영문 대/소문자, 특수문자, 숫자를 사용해주세요";
    password.nextElementSibling.style.color='red';
    flag[1] = 'fail';

   } else if(pwInput.test(password.value) == true){
    password.nextElementSibling.innerHTML="사용 가능합니다";
    password.nextElementSibling.style.color='blue';
    flag[1] = 'pass';
   }
});

// 비밀번호 재확인
pwConfirm.addEventListener("keyup",function(){
    if(password.value != pwConfirm.value){
        pwConfirm.nextElementSibling.innerHTML="위의 입력한 패스워드와 같지 않습니다";
        pwConfirm.nextElementSibling.style.color='red';
        flag[2] = 'fail';

    } else if(password.value == pwConfirm.value){
        pwConfirm.nextElementSibling.innerHTML="위의 입력한 패스워드와 같습니다";
        pwConfirm.nextElementSibling.style.color='blue';
        flag[2] = 'pass';
    }
});

// 이름 확인
nameCheak.addEventListener("keyup",function(){
     if(nameCheak.value.length==0){
        nameCheak.nextElementSibling.innerHTML="이름을 입력하세요";
        nameCheak.nextElementSibling.style.color='red';
        flag[3] = 'fail';

     } else if(nameInupt.test(nameCheak.value) !== true){
        nameCheak.nextElementSibling.innerHTML="영문 또는 한글을 이용해 이름을 입력해주세요";
        nameCheak.nextElementSibling.style.color='red';
        flag[3] = 'fail';

     } else if(nameInupt.test(nameCheak.value) == true){
        nameCheak.nextElementSibling.innerHTML="사용 가능합니다";
        nameCheak.nextElementSibling.style.color='blue';
        flag[3] = 'pass';
     }
});

// 성별 체크
//     genderBox.addEventListener("click",function(){    
//         genderBox.nextElementSibling.innerHTML="체크 완료";
//         genderBox.nextElementSibling.style.color='blue';
// });

// 220727 라디오속성에 이벤트 추가 수정
// 라디오버튼이 하나의 그룹이라는 것을 나타내기 위해서는 name의 같은 값 입력
var radios = document.querySelectorAll('input[name="gender"]'); // 라디오버튼 배열로 가져옴

 for (let i = 0; i < radios.length; i++) {  
    radios[i].addEventListener("change", function() {  // 라디오 버튼을 선택할 시
      let val = this.value;  // 체크된 라디오가 val 변수에 대입
      console.log(val);     // 콘솔창에 on이 찍힘
      flag[4] = 'pass';    
    });
  }

     
// 생년월일
birth.addEventListener("keyup",function(){
    if(birth.value.length==0){
        birth.nextElementSibling.innerHTML="생년월일 8자리를 입력하세요";
        birth.nextElementSibling.style.color='red';
        flag[5] = 'fail';
    } else if(birthDay.test(birth.value) !== true){
        birth.nextElementSibling.innerHTML="생년월일 8자리를 입력하세요";
        birth.nextElementSibling.style.color='red';
        flag[5] = 'fail';
    
    } else if(birthDay.test(birth.value) == true){
        birth.nextElementSibling.innerHTML="생년월일 입력 확인되었습니다";
        birth.nextElementSibling.style.color='blue';
        flag[5] = 'pass';
    }


});


// 휴대전화 확인
phone.addEventListener("keyup", function(){
    if(phone.value.length==0){
        phone.nextElementSibling.innerHTML="휴대전화(-포함)를 입력하세요";
        phone.nextElementSibling.style.color='red';
        flag[6] = 'fail';

     } else if(phoneInput.test(phone.value) !== true){
        phone.nextElementSibling.innerHTML="사용할 수 있는 휴대전화(-포함)를 입력해주세요";
        phone.nextElementSibling.style.color='red';
        flag[6] = 'fail';

     } else if(phoneInput.test(phone.value) == true){
        phone.nextElementSibling.innerHTML="사용 가능합니다";
        phone.nextElementSibling.style.color='blue';
        flag[6] = 'pass';
     }
});

// 주소 확인
address.addEventListener("keyup",function(){
    if(address.value.length==0){
        address.nextElementSibling.innerHTML="밀키트를 배송받을 주소를 입력하세요";
        address.nextElementSibling.style.color='red';
        flag[7] = 'fail';

     } else if(addressInput.test(address.value) !== true){
        address.nextElementSibling.innerHTML="사용할 수 있는 주소를 입력해주세요";
        address.nextElementSibling.style.color='red';
        flag[7] = 'fail';

     } else if(addressInput.test(address.value) == true){
        address.nextElementSibling.innerHTML="사용 가능합니다";
        address.nextElementSibling.style.color='blue';
        flag[7] = 'pass';
     }
});

// 이메일 확인
email.addEventListener("keyup",function(){
    if(email.value.length==0){
        email.nextElementSibling.innerHTML="이메일을 입력하세요";
        email.nextElementSibling.style.color='red';
        flag[8] = 'fail';

     } else if(emailInput.test(email.value) !== true){
        email.nextElementSibling.innerHTML="사용할 수 있는 이메일을 입력해주세요";
        email.nextElementSibling.style.color='red';
        flag[8] = 'fail';

     } else if(emailInput.test(email.value) == true){
        email.nextElementSibling.innerHTML="사용 가능합니다";
        email.nextElementSibling.style.color='blue';
        flag[8] = 'pass';
     }
});


// 220727 회원가입 버튼 누를 시 조건 만족하면 로그인 페이지로 이동
btn.addEventListener("click",function(){
    let check = '';                     // check 변수 선언 이유 : flag='pass'를 담기 위해
    for(let i=0; i<flag.length; i++){   // 한개의 조건을 확인할 때마다 check에 flag 값들이 담김
        check += flag[i];
    }
    console.log(flag);          // 콘솔창에 flag 값 보임
    console.log(check);         // 콘솔창에 check 값 보임
    if(passCheck.test(check) !== true){       // flag 값 중 false가 있을 경우
        alert("가입 양식을 다시 확인해주세요");
    
    } else if(passCheck.test(check) == true) {   // flag 값 모두 true 경우
        alert("가입을 축하합니다");
        location.href=("signIn.html");
    }
});
