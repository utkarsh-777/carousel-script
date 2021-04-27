/*
{{%BACKGROUND_COLOR%}}
{{%BORDER_COLOR%}}
{{%CROUSEL_HEADER%}}
{{%RATING%}}
{{%FOOTER_REVIEW%}}
 {{REVIEW_CARDS}}
 {{%CROUSEL_HEADER_TEXT_COLOR%}}
 {{%AVERAGE_REVIEW_RATING%}}
 {{%CROUSEL_HEADER_TEXT_SIZE%}}
*/
// themeOne_reviewCard

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

let fetchReview;
const ratingStarsChecked = '<span class="fa fa-star checked"></span>';
const ratingStarsUnchecked = '<span class="fa fa-star"></span>';
const ratingStarHalf =
  '<span class="fa fa-star-half-o"  aria-hidden="true" style="color: yellow"></span>';

let avgReviewRating = ` <div>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
</div>`

function createReviewHtml(reviews, reviewCard, data) {
  // NICE TO HAVE FEATURE
  // 1) WILL GIVE CUSTOMER THE OPTIONS TO CHANGE THE NO REVIEW TEXT
  if (!reviews.length) {
    return `<h1 style="text-align: center;">No Reviews</h1>`;
  }
  // ADD LOADING SPINNER
  let script = "";
  for (let i = 0; i < reviews.length; i++) {
    let review;
    if(data.carouselCustomization.enableReviewerName){
      review = reviewCard.replace(
        "{{%CUSTOMER_NAME%}}",
        reviews[i].customerName
      );
    }else{
      review = reviewCard.replace(
        "{{%CUSTOMER_NAME%}}",
        ""
      );
    }

    if(data.carouselCustomization.enableReviewRating){
      let rate = "";

    for (let j = 1; j <= 5; j++) {
      if (j <= reviews[i].rating) rate += ratingStarsChecked;
      else {
        rate += ratingStarsUnchecked;
      }
    }
    review = review.replace("{{%REVIEW_RATING_STAR%}}", rate);
    }else{
      review = review.replace("{{%REVIEW_RATING_STAR%}}","");
    }
    
    if(data.carouselCustomization.enableReviewDate){
      review = review.replace(
        "{{%REVIEW_DATE%}}",
        reviews[i].createdAt.split("T")[0]
      );
    }else{
      review = review.replace(
        "{{%REVIEW_DATE%}}",
        ""
      );
    }
    
    if(data.carouselCustomization.enableReviewBody){
      review = review.replace("{{%REVIEW_DESCRIPTION%}}", reviews[i].description);
    }else{
      review = review.replace("{{%REVIEW_DESCRIPTION%}}", "");
    }
    
    script += review;
  }
  return script;
}

const themeOne_reviewCard = `
<div class="Polaris-Stack__Item">
<div style="text-align:left;">
    <div style="margin-bottom: 5px;">
        <div>
            {{%REVIEW_RATING_STAR%}}
        </div>
    </div>
   {{%REVIEW_DESCRIPTION%}}
   <br/>
    <strong>{{%CUSTOMER_NAME%}}</strong>
    <br/>
    {{%REVIEW_DATE%}}
</div>
</div>
`;

const themeOne = `
<div style="width: 80%;margin: auto;background-color: white;font-family:Cormorant Garamond, serif;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;">
            <div class="Polaris-Card">
              <div class="Polaris-Card__Section">
                  <div>
                    <div class="Polaris-Stack Polaris-Stack--distributionFill">
                      <div class="Polaris-Stack__Item">
                        <div style="text-align:left;">
                            <span style="font-weight:bold; color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</span><br/>
                            {{%AVERAGE_REVIEW_RATING%}}
                            {{%FOOTER_REVIEW%}}
                        </div>
                      </div>
                     {{%REVIEW_CARDS%}}
                    </div>
                  </div>
              </div>
            </div>
          </div>
`;

const themeTwo_reviewCard = `
          <div class="Polaris-Stack__Item">
              <div style="text-align:center;">
                  <div style="margin-bottom: 5px;">
                      <div>
                        {{%REVIEW_RATING_STAR%}}
                      </div>
                  </div>
                  {{%REVIEW_DESCRIPTION%}}
                  <br/>
                  <div>
                      <span class="Polaris-TextStyle--variationSubdued">{{%CUSTOMER_NAME%}}</span>
                  </div>
                  <img src="./tee.png"
                      style='height:60px;width:80px;'
                  />
              </div>
            </div>
              `

const themeTwo = `
<div style="width: 80%;margin: auto;background-color: white;font-family:Cormorant Garamond, serif;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;">
<div>
    <div class="Polaris-Card">
      <div class="Polaris-Card__Section">
          <div>
            <div class="Polaris-Stack">
              <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                <div style="text-align:center;">
                    <span style="font-weight:bold; color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</span><br/>
                    {{%AVERAGE_REVIEW_RATING%}}
                    {{%FOOTER_REVIEW%}}
                </div>
              </div>
            </div>
            <br/>
            <div>
                <div class="Polaris-Stack Polaris-Stack--distributionFillEvenly">
                {{%REVIEW_CARDS%}}
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>
`;

const themeThree_reviewCard = `
            <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                <div class="Polaris-Stack Polaris-Stack--alignmentCenter">
                    <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                      <img src="./tee.png"
                          style='height:60px;width:80px;'
                      />
                    </div>
                    <div class="Polaris-Stack__Item">
                        <div style="text-align:center;">
                            <div style="margin-bottom: 5px;">
                                <div>
                                {{%REVIEW_RATING_STAR%}}
                                </div>
                            </div>
                            {{%REVIEW_DESCRIPTION%}}
                            <br/>
                            <div>
                                <span class="Polaris-TextStyle--variationSubdued">{{%CUSTOMER_NAME%}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`

const themeThree = `
          <div style="width: 80%;margin: auto;background-color: white;font-family:Cormorant Garamond, serif;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;">
            <div>
                <div class="Polaris-Card">
                  <div class="Polaris-Card__Section">
                      <div>
                        <div class="Polaris-Stack">
                          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div style="text-align:center;">
                            <span style="font-weight:bold; color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</span><br/>
                            {{%AVERAGE_REVIEW_RATING%}}
                            {{%FOOTER_REVIEW%}}
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div>
                          <div class="Polaris-Stack Polaris-Stack--distributionFillEvenly">
                            {{%REVIEW_CARDS%}}
                          </div>
                      </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

`;

const themeFour = `
<div style="width: 80%;margin: auto;background-color: white;font-family:Cormorant Garamond, serif;border-radius: 10px;border: 1px solid red;margin-top: 20px;margin-bottom: 20px;">
            <div class="Polaris-Card">
                <div class="Polaris-Card__Section">
                    <div class="Polaris-Stack">
                        <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                          <div style="text-align:center;">
                              <span style="font-weight:bold;">Let Customers Speak for us</span><br/>
                              <div>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                              </div>
                              from 49 reviews
                          </div>
                        </div>
                      </div>
                      <br/>
                      <div class="Polaris-Stack">
                        <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div style="text-align:center;">
                                <span style="font-weight:bold;">Utkarsh Kashyap</span><br/>
                                <div>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                1 Month Ago
                            </div>
                          </div>
                        <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div style="text-align:center;">
                                Aliquam erat volutpat. Sed sed interdum metus. <br/>
                                Nulla massa turpis, imperdiet eu varius eu.<br/>
                                Morbi ut imperdiet justo, ac tempus ex. <br/>
                                Phasellus commodo eu odio sed vestibulum.<br/>
                                Morbi ut imperdiet justo, ac tempus ex. <br/>
                                Phasellus commodo eu odio sed vestibulum.<br/>
                            </div>
                        </div>
                        <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <img src="./tee.png"
                                style='height:120px;width:200px'
                            />
                        </div>
                      </div>
                </div>
            </div>
        </div>
`;

async function start(data) {
  if (data.enableReviewCarousel === false) return;
  if (data.theme === "one"||"two"||"three"||"four") {
    let theme;
    if(data.theme === "one"){
      theme = themeOne;
    }else if(data.theme === "two"){
      theme = themeTwo
    }else if(data.theme === "three"){
      theme = themeThree
    }
    

    /*
{{%BACKGROUND_COLOR%}}
{{%BORDER_COLOR%}}
{{%CROUSEL_HEADER%}}
{{%RATING%}}
{{%FOOTER_REVIEW%}}
{{%REVIEW_CARDS%}}
{{%CROUSEL_HEADER_TEXT_COLOR%}}
`hsla(${color1.hue},${color1.saturation*100}%,${color1.brightness*100}%,1)`
*/
console.log(data.carouselHeader.size)
    const ts = Date.now();
    
    theme = theme.replace(
      "{{%CROUSEL_HEADER_TEXT_COLOR%}}",
      `hsla(${data.carouselHeader.headerTextColor.hue},${
        data.carouselHeader.headerTextColor.saturation * 100
      }%,${data.carouselHeader.headerTextColor.brightness * 100}%,1)`
    );
    theme = theme.replace(
      "{{%CROUSEL_HEADER_TEXT_SIZE%}}",
      data.carouselHeader.size
    )
    if(data.carouselCustomization.enableReviewRating){
      theme = theme.replace("{{%AVERAGE_REVIEW_RATING%}}", avgReviewRating);
    }else{
      theme = theme.replace("{{%AVERAGE_REVIEW_RATING%}}", "");
    }
    theme = theme.replace("{{%CROUSEL_HEADER%}}", data.carouselHeader.title);
    theme = theme.replace(
      "{{%FOOTER_REVIEW%}}",
      data.carouselHeader.summaryText
    );
    theme = theme.replace(
      "{{%BACKGROUND_COLOR%}}",
      `hsla(${data.carouselHeader.backgroundAndBorderColor.hue},${
        data.carouselHeader.backgroundAndBorderColor.saturation * 100
      }%,${data.carouselHeader.backgroundAndBorderColor.brightness * 100}%,1)`
    );
    fetchReview = await fetchReview;
    fetchReview = await fetchReview.json();
    theme = theme.replace(
      "{{%REVIEW_CARDS%}}",
      createReviewHtml(fetchReview.data.reviews, themeOne_reviewCard, data)
    );
    // createReviewHtml(fetchReview.data.reviews, themeOne_reviewCard);
    console.log(
      "🚀 ~ file: reviewCarousel.js ~ line 377 ~ start ~ fetchReview",
      fetchReview
    );
    document.querySelector("footer").insertAdjacentHTML("beforebegin", theme);
    // document.querySelector("body").innerHTML = theme;
    console.log(Date.now() - ts);
  } else console.log("no theme selected");
  console.log("*******************************************************");
  console.log("🚀 ~ file: reviewCarousel.js ~ line 2 ~ start ~ data", data);
}

function init() {
  fetchReview = fetch(
    `http://127.0.0.1:8080/api/v1/carouselSettings/reviews/atishey-jain-please-dont-touch.myshopify.com?page=1&limit=6`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );
  console.log(
    "🚀 ~ file: reviewCarousel.js ~ line 391 ~ init ~ fetchReview",
    fetchReview
  );
  fetch(
    `http://127.0.0.1:8080/api/v1/carouselSettings/getCarouselSettings/email-editor77.myshopify.com`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  )
    .then(function (response) {
      response.json().then(function (data) {
        start(data.data.settings[0]);
        //   console.log(data.data.settings[0]);
      });
    })
    .catch((error) => console.log(error));
}

init();

// ADD CSS FILE
function initCss() {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/gh/utkarsh-777/carousel-script/carousel-script.css"
  );
  document.head.appendChild(link);
}

initCss();
