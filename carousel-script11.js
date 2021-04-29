var slideIndex = 0;
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if(!slides.length || !dots) {
    console.log("no Slides or Dots");
    return ;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
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
<div class="Polaris-Stack__Item" style="margin-left: 30px;">
<div style="text-align:left;">
  <div style="margin-bottom: 5px;">
      <div>
      {{%REVIEW_RATING_STAR%}}
      </div>
  </div>
  <h2>{{%REVIEW_DESCRIPTION%}}</h2>

  <h2>{{%CUSTOMER_NAME%}}</h2>
  <br/>
  <h2>{{%REVIEW_DATE%}}</h2>
</div>
</div>
`;

const themeOne = `
        <div style="width: 80%;margin: auto;margin-bottom:20px;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;">
            <div class="Polaris-Card" style="min-height:150px;">
              <div class="Polaris-Card__Section">
                  <div>
                    <div class="Polaris-Stack Polaris-Stack--distributionFill">
                      <div class="Polaris-Stack__Item">
                        <div style="text-align:left;">
                            <h1 style="color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</h1><br/>
                            {{%AVERAGE_REVIEW_RATING%}}
                            <h3>{{%FOOTER_REVIEW%}}</h3>
                        </div>
                      </div>

                      <div class="slideshow-container">
                        <div class="mySlides fade">
                          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div class="Polaris-Stack Polaris-Stack--distributionFill">
                            {{%REVIEW_CARDS1%}}
                            </div>
                          </div>
                        </div>

                        <div class="mySlides fade">
                          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div class="Polaris-Stack Polaris-Stack--distributionFill">
                            {{%REVIEW_CARDS2%}}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="text-align:center;margin:auto;width:100%;">
                      <span class="dot" onclick="currentSlide(1)"></span>
                      <span class="dot" onclick="currentSlide(2)"></span>
                    </div>
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
                  <h2>{{%REVIEW_DESCRIPTION%}}</h2>
                  <br/>
                  <div>
                      <h2 class="Polaris-TextStyle--variationSubdued">{{%CUSTOMER_NAME%}}</h2>
                  </div>
                  <img src="./tee.png"
                      style='height:60px;width:80px;'
                  />
              </div>
            </div>
              `

const themeTwo = `
<div style="width: 80%;margin: auto;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;margin-bottom: 20px;">
            <div>
                <div class="Polaris-Card">
                  <div class="Polaris-Card__Section">
                      <div>
                        <div class="Polaris-Stack">
                          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div style="text-align:center;">
                            <h1 style="color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</h1><br/>
                            {{%AVERAGE_REVIEW_RATING%}}
                            <h3>{{%FOOTER_REVIEW%}}</h3>
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div>

                            <div class="slideshow-container" style="min-height:150px">
                                <div class="mySlides fade">
                                <div class="Polaris-Stack Polaris-Stack--distributionFillEvenly">
                                {{%REVIEW_CARDS1%}}
                                </div>
                                </div>
                                <div class="mySlides fade">
                                <div class="Polaris-Stack Polaris-Stack--distributionFillEvenly">
                                {{%REVIEW_CARDS2%}}
                                </div>
                                </div>
                            </div>

                            <div style="text-align:center">
                                <span class="dot" onclick="currentSlide(1)"></span>
                                <span class="dot" onclick="currentSlide(2)"></span>
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
                            <h2>{{%REVIEW_DESCRIPTION%}}</h2>
                            <br/>
                            <div>
                                <h2 class="Polaris-TextStyle--variationSubdued">{{%CUSTOMER_NAME%}}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`

const themeThree = `
          <div style="width: 80%;margin: auto;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;margin-bottom: 20px;">
            <div>
                <div class="Polaris-Card">
                  <div class="Polaris-Card__Section">
                      <div>
                        <div class="Polaris-Stack">
                          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                            <div style="text-align:center;">
                            <h1 style="color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</h1><br/>
                            {{%AVERAGE_REVIEW_RATING%}}
                            {{%FOOTER_REVIEW%}}
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div>

                        <div class="slideshow-container">
                          <div class="mySlides fade">
                          <div class="Polaris-Stack Polaris-Stack--distributionFillEvenly">
                          {{%REVIEW_CARDS1%}}
                          </div>
                          </div>
                          <div class="mySlides fade">
                          <div class="Polaris-Stack Polaris-Stack--distributionFillEvenly">
                          {{%REVIEW_CARDS2%}}
                          </div>
                          </div>
                        </div>

                        <div style="text-align:center">
                          <span class="dot" onclick="currentSlide(1)"></span>
                          <span class="dot" onclick="currentSlide(2)"></span>
                        </div>

                      </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

`;

const themeFour_reviewCard = `
        <div class="mySlides fade">
          <div class="Polaris-Stack">
          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
              <div style="text-align:center;">
                  <span style="font-weight:bold;">{{%CUSTOMER_NAME%}}</span><br/>
                  {{%REVIEW_RATING_STAR%}}<br/>
                  <h2>{{%REVIEW_DATE%}}</h2>
              </div>
            </div>
          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
              <div style="text-align:center;">
              <h2>{{%REVIEW_DESCRIPTION%}}</h2>
              </div>
          </div>
          <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
              <img src="./tee.png"
                  style='height:120px;width:200px'
              />
          </div>
          </div>
        </div>
`

const themeFour = `
<div style="width: 80%;margin: auto;border-radius: 10px;border: 1px solid {{%BACKGROUND_COLOR%}};margin-top: 20px;margin-bottom: 20px;">
            <div class="Polaris-Card">
                <div class="Polaris-Card__Section">
                    <div class="Polaris-Stack">
                        <div class="Polaris-Stack__Item Polaris-Stack__Item--fill">
                          <div style="text-align:center;">
                          <h1 style="color:{{%CROUSEL_HEADER_TEXT_COLOR%}}; font-size:{{%CROUSEL_HEADER_TEXT_SIZE%}}px;">{{%CROUSEL_HEADER%}}</h1><br/>
                          {{%AVERAGE_REVIEW_RATING%}}
                          <h2>{{%FOOTER_REVIEW%}}</h2>
                          </div>
                        </div>
                      </div>
                      <br/>
                     
                      {{%REVIEW_CARDS%}}
                      <div style="text-align:center">
                          <span class="dot" onclick="currentSlide(1)"></span>
                          <span class="dot" onclick="currentSlide(2)"></span>
                          <span class="dot" onclick="currentSlide(3)"></span>
                          <span class="dot" onclick="currentSlide(4)"></span>
                          <span class="dot" onclick="currentSlide(5)"></span>
                          <span class="dot" onclick="currentSlide(6)"></span>
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
    }else if(data.theme === "four"){
      theme = themeFour
    }
    
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

    const arr1 = [...fetchReview.data.reviews];
    const arr2 = [...fetchReview.data.reviews];

    if(data.theme === "one"){
      theme = theme.replace(
        "{{%REVIEW_CARDS1%}}",
        createReviewHtml(arr1.slice(0,3), themeOne_reviewCard, data)
      );
      theme = theme.replace(
        "{{%REVIEW_CARDS2%}}",
        createReviewHtml(arr2.slice(3,6), themeOne_reviewCard, data)
      );
    }else if(data.theme === "two"){
      theme = theme.replace(
        "{{%REVIEW_CARDS1%}}",
        createReviewHtml(arr1.slice(0,3), themeTwo_reviewCard, data)
      );
      theme = theme.replace(
        "{{%REVIEW_CARDS2%}}",
        createReviewHtml(arr2.slice(3,6), themeTwo_reviewCard, data)
      );
    }else if(data.theme === 'three'){
      theme = theme.replace(
        "{{%REVIEW_CARDS1%}}",
        createReviewHtml(arr1.slice(0,3), themeThree_reviewCard, data)
      );
      theme = theme.replace(
        "{{%REVIEW_CARDS2%}}",
        createReviewHtml(arr1.slice(3,6), themeThree_reviewCard, data)
      );
    } else if(data.theme === 'four'){
      theme = theme.replace(
        "{{%REVIEW_CARDS%}}",
        createReviewHtml(arr1, themeFour_reviewCard, data)
      );
    }
   
    // createReviewHtml(fetchReview.data.reviews, themeOne_reviewCard);
    console.log(
      "🚀 ~ file: reviewCarousel.js ~ line 377 ~ start ~ fetchReview",
      fetchReview
    );
    //document.querySelector("footer").insertAdjacentHTML("beforebegin", theme);
    document.getElementById('carousel_component').innerHTML = theme;
    showSlides();
    // document.querySelector("body").innerHTML = theme;
    console.log(Date.now() - ts);
  } else console.log("no theme selected");
  console.log("*******************************************************");
  console.log("🚀 ~ file: reviewCarousel.js ~ line 2 ~ start ~ data", data);
}

function init() {
 
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
        let str = `http://127.0.0.1:8080/api/v1/carouselSettings/reviews/atishey-jain-please-dont-touch.myshopify.com?page=1&limit=6`
        if (data.data.settings[0].featureReviews == 'Manual'){
          str += '&favourite=true'
        }
        fetchReview = fetch(
          str,
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
        start(data.data.settings[0]);
         console.log(data.data.settings[0]);
      });
    })
    .catch((error) => console.log(error));
}



// ADD CSS FILE
function initCss() {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/gh/utkarsh-777/carousel-script/carousel-script3.css"
  );
  document.head.appendChild(link);
}


//init();

initCss();

if(window.location.protocol+'//'+window.location.hostname+'/' == window.location.href){
  init();
}
