// jeedlyで保存した記事を全部取得し表示します。
// https://feedly.com/i/saved 内にてコンソールより実行　をしてください。

// ピックアップする情報
// data-alternate-link: 元記事のURL
// data: 記事のタイトル
var pickUpAttrs = ["data-alternate-link", "data-title"];

var prefixNameOfColumnDiv = "section";
var suffixNameOfColumnDiv = "_column0";

// 表示されている項目より、内容をピックアップする
var timelineDivChildren = $("#timeline").children;
var savedArticles = [];
for(var i = 0 ; i < (timelineDivChildren.length / 2) ; i++){
  var NameOfColumnDiv =  prefixNameOfColumnDiv + i.toString() + suffixNameOfColumnDiv;
  var columnDivElement = $("#" + NameOfColumnDiv).children[0];
  savedArticles.push(createArticleJsonFromColumnDiv(columnDivElement));
}
// ページの末尾に、リンクとJSON形式のテキストを追加する
var jsonString = JSON.stringify({savedArticles});
document.getElementById("fullyLoadedFollowing").innerHTML = createArticlesLinkHtmlString(savedArticles) + "</br>" + jsonString;

// 記事一つから欲しい情報だけ抜き取る
function createArticleJsonFromColumnDiv(divElement){
  var pickUpedData = {};
  for(var i = 0 ; i < pickUpAttrs.length ; i++){
    pickUpedData[pickUpAttrs[i]] = divElement.getAttribute(pickUpAttrs[i]);
  }
  return pickUpedData;
}

// HTMLのaタグを作成する
function createArticlesLinkHtmlString(savedArticles){
  var htmlString = "";
  for(var i = 0 ; i < savedArticles.length ; i++){
    htmlString += "<a href=" + savedArticles[i]["data-alternate-link"] +">" + savedArticles[i]["data-title"] + "</a></br>";
  }
  return htmlString;
}
