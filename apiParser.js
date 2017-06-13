class apiParser {
    constructor() {
        this.headlineList = [];
        this.article = [];
        this.NANA_IMAGES_DOMAIN = 'http://f.nanafiles.co.il';
        this.applyImagePathArticle = this.applyImagePathArticle.bind(this);
        this.applyImagePathHeadline = this.applyImagePathHeadline.bind(this);
    }

    applyImagePathHeadline(headlines) {
        this.headlineList = headlines;
        this.headlineList.map((item) => {
            item['ImagePath'] = this.setImagePath(item);
            item['HeadLineName'] = this.setHeadlineName(item);
        },this)

        return this.headlineList;

    }

    applyImagePathArticle(articles) {
        this.article = articles;
        this.article.map((item) => {
            item['ImagePathArticle'] = this.GetImagePathByType(item.ArticleMediaStockImageID, ImageTypes.Article_Default, 'jpg');
            item['imagePathParagraph'] = this.GetImagePathByType(item.PicMediaStockImageID, ImageTypes.Main_450_450, 'jpg');
        },this)

        return this.article;
    }

    talkbackParser(talkbacks){
        return talkbacks;
    }

    setImagePath(element) {
        return this.GetImagePathByType(element.MediaStockImageID, DisplaySignsToHeadlineTypes[element.DisplaySigns].imageType.mediaStockType, 'jpg');
    }

    setHeadlineName(element) {
        return DisplaySignsToHeadlineTypes[element.DisplaySigns].headlineName;
    }

    GetImagePathByType(mediaStockImageID, type, mediaStockImageExt) {
        if (mediaStockImageID === null || mediaStockImageID === "") return "";
        let currentExt = mediaStockImageExt || 'jpg';
        return this.GetImagePath(mediaStockImageID, type, currentExt);
    }

    GetImagePath(mediaStockImageID, mediaStockImageTypeID, mediaStockImageExt = 'jpg') {
        if (mediaStockImageID === 0)
            return '';
        if (mediaStockImageTypeID > 0) {
            return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/img/' + mediaStockImageTypeID + '/' + (mediaStockImageID / 1000000).toFixed(0) +
                '/' + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '.' + mediaStockImageExt;
        }
        return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/NOREPLICATION/img/' + (mediaStockImageID / 1000000).toFixed(0) + '/' +
            Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '_THUMBNAIL.' + mediaStockImageExt;

    }
}

module.exports = apiParser;

const ImageTypes = {
    Thumbnail_109_59: {
        size: '109*59',
        type: 'thumbnail',
        mediaStockType: 28
    },
    Small_303_165: {
        size: '303*165',
        type: 'small',
        mediaStockType: 493
    },
    Standard_606_366: {
        size: '606*366',
        type: 'standard',
        mediaStockType: 1789
    },
    Medium_460_258: {
        size: '460*258',
        type: 'medium',
        mediaStockType: 693
    },
    Big_768_400: {
        size: '768*400',
        type: 'big',
        mediaStockType: 1677
    },
    Headline_Big_460_258: {
        size: '460*258',
        type: 'headline_big',
        mediaStockType: 693
    },
    Article_Default: {
        size: '109*59',
        type: 'article',
        mediaStockType: 11
    },
    Main_450_450: {
        size: '450*450',
        type: 'main',
        mediaStockType: 76
    },
    Main_303_165: {
        size: '300*165',
        type: 'main',
        mediaStockType: 493
    },
    Small_130_72: {
        size: '130*72',
        type: 'small',
        mediaStockType: 2
    }

}

const DisplaySignsToHeadlineTypes = {
    10: {
        headlineName: 'Big',
        imageType: ImageTypes.Headline_Big_460_258
    },
    1: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_130_72
    }, // temporary replaced by standard item in views
    2: {
        headlineName: 'Main',
        imageType: ImageTypes.Main_450_450
    },
    8: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_303_165
    },
    9: {
        headlineName: 'Pair',
        imageType: ImageTypes.Headline_Big_460_258
    },
    0: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_303_165
    },
    6: {
        headlineName: 'Alert',
        imageType: ImageTypes.Thumbnail_109_59
    },
    3: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_303_165
    },
    4: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_303_165
    },
    5: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_303_165
    },
    7: {
        headlineName: 'Small',
        imageType: ImageTypes.Small_303_165
    }

};