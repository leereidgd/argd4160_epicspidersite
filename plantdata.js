const sortConfig = {
  water: {
    field: 'Optimal_Watering_Frequency',
    order: {
      'When soil is bone dry': 1,
      'Constant saturation': 2
    },
    colors: {
      'When soil is bone dry': '#C5E99B',
      'Constant saturation': '#7DB9D3'
    }
  },
  sunlight: {
    field: 'Sunlight_Requirements',
    order: {
      'Medium-high': 1,
      'High': 2
    },
    colors: {
      'Medium-high': '#F7D76B',
      'High': '#F4A261'
    }
  },
  location: {
    field: 'Region_of_Origin',
    order: {},
    colors: {
      default: '#a7768f'
    }
  }
};

let allPlants = [];
let activeSort = 'water';

const plantImages = {
  'Aloe Vera': 'images/aloe.jpg',
  'Basil': 'images/basil.jpg',
  'Bladderwort': 'images/bladderwort.jpg',
  'Butterwort': 'images/butterwort.jpg',
  'cobra lily': 'images/cobralily.jpg',
  'Corkscrew': 'images/corkscrew.jpg',
  'Dewy Pine': 'images/dewypine.jpg',
  'Golden Pothos': 'images/pothos.jpg',
  'Hoya Carnosa': 'images/hoyacarnosa.jpg',
  'Hoya Macrophylla': 'images/hoyamacrophylla.jpg',
  'Hoya Pink Flamingo': 'images/hoyapinkflamingo.jpg',
  'Monstera Adansonii': 'images/monsteraadansonii.jpg',
  'Monstera Deleciosa': 'images/monst.jpg',
  'Monstera Deleciosa Thai Constellation': 'images/monsterathaiconstellation.jpg',
  'Monstera Esqueletoo': 'images/monsteraesqueletoo.jpg',
  'Nepenthes': 'images/nepenthes.jpg',
  'Purple Basil': 'images/purplebasil.jpg',
  'Sarracenia': 'images/sccna.jpg',
  'sun pitcher': 'images/sunpitcher.jpg',
  'Sundews': 'images/sundew.jpg',
  'Tradescantia': 'images/tradescantia.jpg',
  'Venus Fly Trap': 'images/venus.jpg',
  'Waterwheel': 'images/waterwheel.jpg',
  'White Bird of Paridise': 'images/plant.jpg'
};

function showPlantPreview(plant) {
  const previewImage = document.getElementById('plant-preview-image');
  const plantName = plant['Plant Type'].trim();
  const imagePath = plantImages[plantName];

  if (!imagePath) {
    clearPlantPreview();
    return;
  }

  previewImage.src = imagePath;
  previewImage.alt = plantName;
  previewImage.hidden = false;
}

function clearPlantPreview() {
  const previewImage = document.getElementById('plant-preview-image');
  previewImage.hidden = true;
  previewImage.removeAttribute('src');
  previewImage.alt = '';
}

function getSortedPlants(sortKey) {
  const config = sortConfig[sortKey];

  if (sortKey === 'location') {
    return [...allPlants].sort((a, b) => {
      const aLocation = (a['Region_of_Origin'] || '').toLowerCase();
      const bLocation = (b['Region_of_Origin'] || '').toLowerCase();
      return aLocation.localeCompare(bLocation);
    });
  }

  return [...allPlants].sort((a, b) => {
    const aRank = config.order[a[config.field]] || 0;
    const bRank = config.order[b[config.field]] || 0;
    return aRank - bRank;
  });
}

function filterBySearch(plants, searchTerm) {
  if (!searchTerm) return plants;

  const term = searchTerm.toLowerCase();
  return plants.filter((plant) =>
    plant['Plant Type'].toLowerCase().includes(term)
  );
}

function renderPlants(plants, sortKey = 'all') {
  const plantList = document.getElementById('plant-list');
  plantList.innerHTML = '';

  const searchField = document.getElementById('plant-search');
  const searchTerm = searchField ? searchField.value.trim() : '';
  const filteredPlants = filterBySearch(plants, searchTerm);

  filteredPlants.forEach((plant) => {
    const listItem = document.createElement('li');
    listItem.className = 'plant-item';
    listItem.tabIndex = 0;
    listItem.addEventListener('mouseenter', () => showPlantPreview(plant));
    listItem.addEventListener('mouseleave', clearPlantPreview);
    listItem.addEventListener('focus', () => showPlantPreview(plant));
    listItem.addEventListener('blur', clearPlantPreview);

    const name = document.createElement('span');
    name.textContent = plant['Plant Type'];

    const tagWrap = document.createElement('div');
    tagWrap.className = 'tag-wrap';

    if (sortKey === 'all') {
      const waterTag = document.createElement('span');
      waterTag.textContent = plant['Optimal_Watering_Frequency'];
      waterTag.className = 'water-tag';
      waterTag.style.backgroundColor = sortConfig.water.colors[plant['Optimal_Watering_Frequency']] || '#D3BCC7';

      const sunlightTag = document.createElement('span');
      sunlightTag.textContent = plant['Sunlight_Requirements'];
      sunlightTag.className = 'water-tag';
      sunlightTag.style.backgroundColor = sortConfig.sunlight.colors[plant['Sunlight_Requirements']] || '#D3BCC7';

      const locationTag = document.createElement('span');
      locationTag.textContent = plant['Region_of_Origin'];
      locationTag.className = 'water-tag';
      locationTag.style.backgroundColor = sortConfig.location.colors.default || '#D3BCC7';

      tagWrap.appendChild(waterTag);
      tagWrap.appendChild(sunlightTag);
      tagWrap.appendChild(locationTag);
    } else {
      const config = sortConfig[sortKey];
      const tag = document.createElement('span');
      tag.textContent = plant[config.field];
      tag.className = 'water-tag';
      tag.style.backgroundColor = config.colors[plant[config.field]] || config.colors.default || '#D3BCC7';
      tagWrap.appendChild(tag);
    }

    listItem.appendChild(name);
    listItem.appendChild(tagWrap);
    plantList.appendChild(listItem);
  });
}



async function loadData() {
  try {
    const response = await fetch('./plantdata.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    allPlants = await response.json();
    renderPlants(allPlants, 'water');
  } catch (error) {
    console.error('Error loading plant data:', error);
    const plantList = document.getElementById('plant-list');
    plantList.innerHTML = '<li>Unable to load plant data.</li>';
  }
}

const allButton = document.getElementById('all-button');
const waterButton = document.getElementById('water-button');
const sunlightButton = document.getElementById('sunlight-button');
const locationButton = document.getElementById('location-button');
const searchField = document.getElementById('plant-search');
const sortButtons = {
  all: allButton,
  water: waterButton,
  location: locationButton,
  sunlight: sunlightButton
};

function setActiveSort(sortKey) {
  activeSort = sortKey;

  Object.entries(sortButtons).forEach(([key, button]) => {
    if (button) {
      button.classList.toggle('active', key === sortKey);
      button.setAttribute('aria-pressed', String(key === sortKey));
    }
  });
}

if (allButton) {
  allButton.addEventListener('click', () => {
    setActiveSort('all');
    renderPlants(allPlants, activeSort);
  });
}

if (waterButton) {
  waterButton.addEventListener('click', () => {
    setActiveSort('water');
    renderPlants(getSortedPlants('water'), activeSort);
  });
}

if (sunlightButton) {
  sunlightButton.addEventListener('click', () => {
    setActiveSort('sunlight');
    renderPlants(getSortedPlants('sunlight'), activeSort);
  });
}

if (locationButton) {
  locationButton.addEventListener('click', () => {
    setActiveSort('location');
    renderPlants(getSortedPlants('location'), activeSort);
  });
}

setActiveSort(activeSort);

if (searchField) {
  searchField.addEventListener('input', () => {
    if (activeSort === 'water') {
      renderPlants(getSortedPlants('water'), 'water');
    } else if (activeSort === 'sunlight') {
      renderPlants(getSortedPlants('sunlight'), 'sunlight');
    } else if (activeSort === 'location') {
      renderPlants(getSortedPlants('location'), 'location');
    } else {
      renderPlants(allPlants, 'all');
    }
  });
}

loadData();
