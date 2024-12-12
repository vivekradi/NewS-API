const input = document.getElementById('input');
const btn = document.getElementById('btn');
const rowData = document.getElementById('rowData');

getAPI('tesla');
// Open And Close Box
$('#openBox').on('click',function(){
if($('aside').css('left') === '-300px')
  {
   $('aside').animate({left:0},1000);
  }
  else{
    $('aside').animate({left:'-300px'},1000);

  }
});

//Start Search By KeyWord
btn.addEventListener('click',function(){
  getAPI(input.value);
  input.value = '';
});
document.addEventListener('keyup',function(e){
  if(e.key === 'Enter'&& input.value != '')
  {
    getAPI(input.value);
    input.value = '';
  }
  
})

// GET API
let arr = ``;
async function getAPI(KeyWord)
{
  try{
    document.querySelector('.loading').classList.replace('d-none','d-flex');
    let response = await fetch(`https://newsapi.org/v2/everything?q=${KeyWord}&from=2024-11-12&sortBy=publishedAt&apiKey=ec57b8bae7dc4a1b84dce8ec3747477c`);
          let finallData = await response.json();
           arr = finallData.articles[1];
           DisplayNews();
  }
  catch(error)
  {
    alert(error);
  }
  finally{
    document.querySelector('.loading').classList.replace('d-flex','d-none');

  }
    
}

// Display API
function DisplayNews()
{
    let cartona = `
       <!-- header -->
                    <h2 class="py-3 text-bg-primary rounded-pill"><span class='text-danger'>News source </span>: ${arr.source.name}</h2>
                     <div class='row  my-5 align-items-center  g-4 px-3'>
                     <div class='col-md-6'>
                     <div class='inner in1 rounded-5 py-5'>
                       <h3 class='me-5'><span class='text-danger'>Author</span>:${arr.author}</h3>
                     </div>
                     
                     </div>
                      <div class='col-md-6'>
                     <div class='inner in2 bg-danger rounded-5 py-5'>
                      <h3 class='ms-5'><span class='text-danger'>Title Article</span>: ${arr.title}</h3>
                     </div>
                     </div>
                     </div>
                    <!-- Description -->
                    <p id="desc" class="text-bg-secondary p-3 rounded-2 my-5 fs-4 animate__animated animate__shakeY"><span class='text-danger'>Description</span>: ${arr.description}</p>
                    <!-- link and img -->
                    <div class="GoTo d-flex gap-3 justify-content-between align-items-center mt-5">
                        <a target='_blank' href="${arr.url}" id="URL" class="text-bg-warning w-50 h-25 p-3 rounded-2 animate__animated animate__jello">URLTo Read All
                            Article</a>
                        <img  id="photo-news" src="${arr.urlToImage}" class="w-50 ms-5 rounded-3" alt="photo realated by news">
                    </div>
                    <!-- date and next content -->
                    <div class='mt-5'>
                       <p class="pt-5 fs-3">publishedAt : ${Array.from(arr.publishedAt).join('').slice(0,10)}</p>
                    </div>
    `;
     
    rowData.innerHTML = cartona

    
}

