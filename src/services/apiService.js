import { API_KEY } from "../assets/main/config.js";

export async function fetchDataAndRender(id) {
  try {
    const response = await fetch("http://localhost:3000/posts");

    if (!response.ok) {
      throw new Error(`Failed to load JSON data: ${response.status}`);
    }
    const dbData = await response.json();

    const post = dbData.find((item) => item.id === id);
    if (!post) {
      console.error(`Id ${id} não existe em db.json`);
      return;
    }

    const apiUrl = `https://world-dive-centres-api.p.rapidapi.com/api/divecentres?country=${post.name}`;
    const settings = {
      async: true,
      crossDomain: true,
      url: apiUrl,
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "world-dive-centres-api.p.rapidapi.com",
      },
    };

    const apiResponse = await fetch(apiUrl, settings);
    if (!apiResponse.ok) {
      throw new Error(`Error no fetch: ${apiResponse.status}`);
    }
    const responseData = await apiResponse.json();

    renderData(post, responseData.data[0]);
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
  }
}

function renderData(post, response) {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) {
    console.error("Element with id 'main-content' not found");
    return;
  }

  const section = document.createElement("section");
  section.classList.add("h-full", "flex");

  section.innerHTML = `
    <div class="w-1/3 p-10 flex justify-center items-center">
      <img
        src="${post.image}"
        class="w-full rounded-lg"
        alt="${post.title}"
        style="height: 500px; object-fit: cover"
      />
    </div>
    <div class="w-2/3 p-10">
      <div class="flex justify-between items-center text-chalk">
        <h2 class="text-sm md:text-base font-montserrat font-medium text-chalk mb-1">
          ${post.certif} &bull; ${post.name}
        </h2>
        <button id="likeButton" class="like-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>
      <h1 class="text-sm md:text-lg text-chalk font-oswald font-semibold mb-3">
        ${post.title}
      </h1>
      <p id="text" class="text-xs md:text-sm font-montserrat leading-snug md:leading-relaxed mb-3">
        ${post.text}
      </p>
      <div class="pt-2 flex flex-wrap font-montserrat text-chalk text-sm">
        <div class="pr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <div class="pl-2">
            <p id="latitude">latitude: ${response.latitude}</p>
            <p id="longitude">longitude: ${response.longitude}</p>
          </div>
        </div>
        <div class="pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>

              <div className="pl-2">
                <p>${post.language}</p>
              </div>
            </div>
          </div>
         <div style="position: relative">
        <button
          class="apply-button bg-blue-100 hover:bg-blue-200 text-gray font-montserrat py-1 px-2 rounded"
          style="position: absolute; bottom: -280px; right: 0"
        >
          <a class="hover:text-gray" href="#">Aplique agora</a>
        </button>
      </div>
        </div>
      </div>
    </div>
    
  `;

  mainContent.appendChild(section);

  const likeButton = section.querySelector("#likeButton");
  likeButton.addEventListener("click", function () {
    console.log("Like button clicked!");
  });

  document.getElementById("menu-btn").addEventListener("click", function () {
    let offcanvasMenu = document.getElementById("offcanvas-menu");
    offcanvasMenu.classList.remove("hidden");
  });

  document.getElementById("close-btn").addEventListener("click", function () {
    let offcanvasMenu = document.getElementById("offcanvas-menu");
    offcanvasMenu.classList.add("hidden");
  });

  document
    .getElementById("profile-menu-btn")
    .addEventListener("click", function () {
      document.getElementById("profile-menu").classList.toggle("hidden");
    });
  const applyButton = section.querySelector(".apply-button");
  applyButton.addEventListener("click", function () {
    window.location.href = "/projeto-worldpackers/src/pages/404.html";
  });

  document.getElementById("likeButton").addEventListener("click", function () {
    const likeButton = this;
    const isLiked = likeButton.classList.toggle("liked");

    if (isLiked) {
      likeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>`;
      console.log("Post liked!");
    } else {
      likeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" class="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>`;
      console.log("Post unliked!");
    }
  });
}

export async function verificarCredenciais(email, password) {
  try {
    const response = await fetch("http://localhost:3000/credentials");
    if (!response.ok) {
      throw new Error("Erro ao buscar credenciais do servidor");
    }

    const credentials = await response.json();
    const user = credentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    return user ? true : false;
  } catch (error) {
    console.error("Erro ao verificar credenciais:", error);
    return false;
  }
}
