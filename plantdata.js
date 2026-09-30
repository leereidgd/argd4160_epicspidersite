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
      default: '#D3BCC7'
    }
  }
};

let allPlants = [];
let activeSort = 'all';

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

if (allButton) {
  allButton.addEventListener('click', () => {
    activeSort = 'all';
    renderPlants(allPlants, activeSort);
  });
}

if (waterButton) {
  waterButton.addEventListener('click', () => {
    activeSort = 'water';
    renderPlants(getSortedPlants('water'), activeSort);
  });
}

if (sunlightButton) {
  sunlightButton.addEventListener('click', () => {
    activeSort = 'sunlight';
    renderPlants(getSortedPlants('sunlight'), activeSort);
  });
}

if (locationButton) {
  locationButton.addEventListener('click', () => {
    activeSort = 'location';
    renderPlants(getSortedPlants('location'), activeSort);
  });
}

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
