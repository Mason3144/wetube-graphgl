## User

- [x] User model
- [x] Create account(hash password)
- [x] Login
- [x] loggedinUser/protectedUser
- [x] Edit profile(hash password)
- [x] My profile
- [x] Avatar upload (editProfile-avatar)
- [x] social api login/social create account
- [x] Email verification

--Backend--
schema verification model 생성후 unique 코드 생성
model user 와 연결 후 verified field defalt false
mailgun email [variable]에 code 추가 후 user-verified의 사용자 고유 코드 전송

--Frontend--
사용자가 email을 클릭시에 arg로 url의 code 삽입후 Mutation verifyEmail실행

## Chennel

## Video

## Search videos and chennels

## Comment

## Likes
