export class Card {
    title: string; // 카드의 제목
    id: string; // 카드의 문서 아이디

    constructor(id:string, title:string) {
        this.id = id;
        this.title = title;
    }
}
