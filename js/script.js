const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allData = data.data.tools;
    displayData(allData);

}

const displayData = (allData) => {
    const itemContainer = document.getElementById('item-container');
    for (let data of allData) {
        const div = document.createElement('div');
        console.log(data);
        div.innerHTML = `
        <div class="card card-compact shadow-xl bg-gray-100 p-5">
                <img class="h-[250px] w-auto" src="${data?.image}" alt="Not Found">
                <h3 class="text-2xl font-semibold mt-4">Features</h3>
                <ol>
                    <li>1. ${data?.features[0]}</li>
                    <li>2. ${data?.features[1]}</li>
                    <li>3. ${data?.features[2]}</li>
                </ol>
                <hr class="border-none h-[1px] bg-gray-300 my-4">
                <h3 class="text-2xl font-bold">${data.name}</h3>
                <div class="flex items-center gap-2 mt-2">
                <div><img src="./images/data.png" alt=""></div>
                <h4>${data?.published_in}</h4>
                </div>
                <div class="card-body">
                    <div class="card-actions justify-end">
                        <button onclick="showDetails('${data?.id}'); open_modal.showModal()" class="btn btn-primary">Check It</button>
                    </div>
                </div>
            </div>
        `;
        itemContainer.appendChild(div);
    }
}

const showDetails = async (id) => {
    // console.log(id);    
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const allSingleData = await res.json();
    const allData = allSingleData.data;
    modalInfo(allData);
}

const modalInfo = (data) => {
    console.log(data.pricing[0].price);

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.textContent = '';
    const columnOne = document.createElement('div');
    columnOne.classList.add('one');
    columnOne.innerHTML = `
    <p>${data?.description || 'Null data'}</p>
    <div class="flex flex-col lg:flex-row gap-3 justify-between mt-4">
        <div class="flex flex-col p-4 bg-white rounded-lg justify-center items-center text-green-400 font-bold">
            <p>${data?.pricing[0]?.price}</p>
            <p>${data?.pricing[0]?.plan}</p>
        </div>
        <div class="flex flex-col p-4 bg-white rounded-lg justify-center items-center text-red-400 font-bold">
            <p>${data?.pricing[1]?.price}</p>
            <p>${data?.pricing[1]?.plan}</p>
        </div>
        <div class="flex flex-col p-4 bg-white rounded-lg justify-center items-center text-red-600 font-bold">
            <p>Contact us</p>
            <p>Enterprise</p>
        </div>
    </div>
    <div class="flex gap-3 justify-between mt-4">
    <div>
        <h2 class="text-2xl font-bold">Features</h2>
        <ul class="space-y-1 mt-3">
            <li>${data?.features['1']?.feature_name}</li>
            <li>${data?.features['2']?.feature_name}</li>
            <li>${data?.features['3']?.feature_name}</li>
        </ul>
    </div>
    <div>
        <h2 class="text-2xl font-bold">Integrations</h2>
        <ul class="space-y-1 mt-3">
            <li>${data?.integrations[0]}</li>
            <li>${data?.integrations[1]}</li>
            <li>${data?.integrations[2]}</li>
        </ul>
    </div>
    </div>
    `;
    const columnTwo = document.createElement('div');
    columnTwo.innerHTML = `
    <div class=""><img class="w-[100%] h-auto rounded-lg" src="${data?.image_link[0]}" alt=""></div>
    
    `;
    showDetailsContainer.appendChild(columnOne);
    showDetailsContainer.appendChild(columnTwo);


}

loadData();