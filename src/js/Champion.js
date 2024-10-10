export default class Champion {
    constructor(data) {
        this.chName = data.name;
        this.chTitle = data.title;
        this.chImageFull = data.image.full;
        this.chImageSprite = data.image.sprite;
        this.chLore = data.blurb;
        this.tags = data.tags;
        this.stats = data.stats;
    }

}