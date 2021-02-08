# 대충 메모장

## 할거

* 카드간 링크 만들기
새로운 테이블을 만든다
이래야 유저별 링크도 만들수있을거고등ㅇ등드읃으

고려할 사항

from이랑 to는 사전순으로 결정되는데, from에도 있을 수 있고, to에도 있을 수 있음
-> 검색을 2번하고 concat해야됨
-> 길이 2짜리 배열로 만들고 array-contains 해도 될거같은데

링크된곳의 타이틀을 가져오려면
-> 문서의 ID로 또 검색해서 타이틀 가져오고...
-> 굳이 이러지말고 링크에 타이틀도 같이 넣어버리는건 어떨까? - 생성시 자기가 0번이고 타겟이 1번으로

만일 타이틀이 수정된다
-> 요금제 바꾸고 functions 쓰던가 / 바꾸기 전에 타이틀을 바꾸는지 확인해서 같이 수정하든가

* 카드 내용 수정하고 저장할 수 있게 만들기

# 술자리 - SoolJari

For my perfect alcohol life

[![CodeFactor](https://www.codefactor.io/repository/github/merseong/sooljari/badge?s=7aaf9723c4ad27864121ccc4fdbb83dcc5660310)](https://www.codefactor.io/repository/github/merseong/sooljari)

## 프로젝트 초기 세팅

### 초기 설치

현재는 Codespace 절찬 이용중 (12월 31일까지)  
이제 goormide 사용한다

[Git](https://git-scm.com/download/win)

[Node.js](https://nodejs.org/dist/v14.15.0/node-v14.15.0-x64.msi)

[VS Code](https://aka.ms/win32-x64-user-stable)

```
$ git clone <git address>
$ git config user.name "Name"
$ git config user.email "Email@e.e"
$ git checkout -t origin/development
```

### 초기 개발용 세팅

```
$ cd hosting
$ npm i
$ npx firebase login
$ npm run preview
```
프로젝트가 연결되지 않았을 경우
```
$ npx firebase use --add
-> alias는 default로
```

### Firebase에 Deploy하는 방법

```
$ cd hosting
$ npx firebase login
$ npm run deploy
```
또는...
```
$ npx firebase hosting:clone sooljari-alcdb:preview sooljari-alcdb:live
```

## 아무말

술 데이터베이스를 보여줄 웹 사이트를 만들것

1. 술에 대해 검색하고 그 정보를 볼 수 있어야된다. -> 이름, 도수, 만든곳, 파는곳?, 가격?, 맛, 등등 -> 레퍼런스로 사용해도 될 정도의 정확함
2. 내가 먹었던 술을 저장해두고, 리뷰같은걸 쓸 수 있어야 한다. 다른사람도 이 리뷰를 볼 수 있게 - 술을 콜렉팅하는 기분을 낼 수 있도록 - 레벨과 경험치?
3. 내가 좋다고 평가한, 나쁘다고 평가한 술들을 기반으로 먹어보지 않은 술을 추천해줬으면 좋겠다.
4. 술 사진 찍으면 무슨 술인지 찾아주면 좋겠다.
5. 사이트가 예뻐야한다. 감성터지게
6. 카톡에 검색하면 정보를 확인할 수 있게 (공유가능, 검색가능)
7. 술 마시는게 즐겁다는 기분과, 그걸 공유할 수 있는
8. 같이 먹으면 좋은 안주들도? 어디서 먹을수 있는지도 알수있게?
9. 커스텀 가능한 초기화면
10. 별자리 - 술자리, 어두운 밤하늘에 술한잔

근데 이것도 한참 먼 이야기인듯
