const sqlManager = require('./sqlManager');
const apiParser = require('./apiParser');
const mongoManager = require('./mongoManager');

class apiRoutes {
    constructor(router) {
        router
            .get('/mainTopFour', function (req, res) {
                console.log('mainTopFour');
                let query = "SELECT TOP 1 [DestArticleID],[DisplayOrder],[Title],[PrimeTag],[SubTitle],[Strip" +
                        "eColor],[ServiceID],[HebServiceName],[MediaStockImageID],[MediaStockImageAlt],[M" +
                        "ediaStockImageCredit],[VideoID],2 as [DisplaySigns],[LastModifyDate],[LinkHref] " +
                        "FROM [BaseDB].[dbo].[TenTvAppFront_Main] union SELECT TOP 3 [DestArticleID],[Dis" +
                        "playOrder],[Title],[PrimeTag],[SubTitle],[StripeColor],[ServiceID],[HebServiceNa" +
                        "me],[MediaStockImageID],[MediaStockImageAlt],[MediaStockImageCredit],[VideoID] ," +
                        "10 as [DisplaySigns],[LastModifyDate],[LinkHref] FROM [BaseDB].[dbo].[TenTvAppFr" +
                        "ont_Main] where DisplayOrder between 2 and 4  order by DisplayOrder";
                let parser = new apiParser();
                let parserCallback = parser.applyImagePathHeadline;
                let params = new SqlManagerParams({res: res, req: req, query: query, parserCallback: parserCallback});
                sqlManager.runSqlPromise(params);
            });

        router.get('/mainFeed', function (req, res) {
            console.log('mainFeed');
            let query = "select *from (select top 1000 Row_Number() over (order by DisplayOrder) as RowNu" +
                    "mber,*    from [TenTvAppFront_Main]) as PagedTable where RowNumber between 5 and" +
                    " 1000 order by DisplayOrder";

            let parser = new apiParser();
            let parserCallback = parser.applyImagePathHeadline;
            let params = new SqlManagerParams({res: res, req: req, query: query, parserCallback: parserCallback});
            sqlManager.runSqlPromise(params)
        });

        router.get('/mainFeed/:ids', function (req, res) {
            let ids = req.params.ids;
            let query = "SELECT TOP 200 *,0 as DisplaySigns FROM [BaseDB].[dbo].[TenTvAppFront_ArticlesPe" +
                    "rServices] where ServiceID IN (" + ids + ") order by DestArticleId";

            let parser = new apiParser();
            let parserCallback = parser.applyImagePathHeadline;
            let params = new SqlManagerParams({res: res, req: req, query: query, parserCallback: parserCallback});

            sqlManager.runSqlPromise(params);
        });

        router.get('/article/:id', function (req, res) {
            let id = req.params.id;
            let query = "SELECT TOP 200 *  FROM [BaseDB].[dbo].[TenTvAppFront_Article] where ArticleID=" + id + " order by ArticleID desc";
            sqlManager.runSqlPromise(...params);
            let parser = new apiParser();
            let parserCallback = parser.applyImagePathArticle;
            let params = new SqlManagerParams({res: res, req: req, query: query, parserCallback: parserCallback});
            sqlManager.runSqlPromise(params);
        });

        router.get('/article/talkback/:id', function (req, res) {
            //let id = req.params.id; let id = 428277;
            let query = "SELECT TOP 1000 * FROM [BaseDB].[dbo].[TenTvAppFront_Talkback]";
            let parser = new apiParser();
            let parserCallback = parser.talkbackParser;
            let params = new SqlManagerParams({res: res, req: req, query: query, parserCallback: parserCallback});
            sqlManager.runSqlPromise(params);
        });
        router.get('/chat', function (req, res) {
            res.sendFile(__dirname + '/index.html');
        });
        /*monodb start*/
        router.get('/article/talkback/sql/:id', function (req, res) {
            let parser = new apiParser();
            let id = 428277;
            let query = "SELECT TOP 1000 * FROM [BaseDB].[dbo].[TenTvAppFront_Talkback] order by MessageI" +
                    "D ";
            let parserCallback = parser.applyImagePathArticle;
            let params = new SqlManagerParams({res: res, req: req, query: query, parserCallback: parserCallback});
            mongoManager.runSqlPromise(params);
        });

        router.get('/article/talkback/mongo/:id', function (req, res) {
            // //let id = req.params.id; let id = 428277;
            console.log('/article/talkback/mongo/:id');
            let params = [res, req];
            mongoManager.getFromMongoDb(...params);
        });

        router.post('/article/talkback/mongo', function (req, res) {
            //let tb = req.params.talkback;
            console.log('/article/talkback/mongo/:talkback');
            let params = [res, req];
            mongoManager.putToMongoDb(...params)
        });
        /*monodb end*/
    }
}

class SqlManagerParams {
    constructor(props) {
        this.req = props.req;
        this.res = props.res;
        this.query = props.query;
        this.parserCallback = props.parserCallback;
    }
}

module.exports = {
    apiRoutes,
    SqlManagerParams
};