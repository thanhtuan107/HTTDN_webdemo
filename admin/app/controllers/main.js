import api from '../services/api.js';
import Wine from '../models/Product.js';
import {
  validateName,
  validatePrice,
  validateVolume,
  validateAlcoholContent,
  validateImage,
  validateDescription,
  validateType,
  validateOrigin
} from '../utils/validation.js';

const getEleid = (id) => document.getElementById(id);

const renderWine = (data) => {
    let content = "";

    data.forEach((wine, i) => {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${wine.name}</td>
                <td>${wine.type}</td>
                <td>${wine.origin}</td>
                <td>${wine.volume} ml</td>
                <td>${wine.alcoholContent}%</td>
                <td>${wine.price}</td>
                <td>
                    <img src="${wine.image}" width="60" alt="${wine.name}" />
                </td>
                <td>${wine.description}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit('${wine.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete('${wine.id}')">Delete</button>
                </td>
            </tr>`;
    });

    getEleid('tblDanhSachSP').innerHTML = content;
};

const getListWine = (searchTerm = "", sortOrder = "") => {
  const promise = api.fetchWines();

  promise
    .then((result) => {
      let data = result.data;

      if (searchTerm) {
        data = data.filter((wine) =>
          wine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (sortOrder) {
        data.sort((a, b) => {
          if (sortOrder === "asc") return a.price - b.price;
          if (sortOrder === "desc") return b.price - a.price;
        });
      }

      renderWine(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  getListWine(searchTerm);
});

const sortWines = (order) => {
  getListWine("", order);
};
window.sortWines = sortWines;

const validateModalForm = () => {
  const name = getEleid('TenSP').value;
  const type = getEleid('LoaiSP').value;
  const origin = getEleid('XuatXuSP').value;
  const volume = getEleid('DungTichSP').value;
  const alcoholContent = getEleid('DoConSP').value;
  const price = getEleid('GiaSP').value;
  const image = getEleid('HinhSP').value;
  const description = getEleid('MoTa').value;

  let isValid = true;

  // ...validation logic for each field...

  return isValid;
};

const handleDelete = (id) => {
   const promise = api.deleteWineById(id);
   promise
        .then((result) => {
            console.log(result.data);
            alert(`Delete ${result.data.id} success!!`);
            getListWine();
        })
        .catch((error) => {
            console.log(error);
        });
};
window.handleDelete = handleDelete;

getListWine();

const clearModalInputs = () => {
  getEleid('TenSP').value = '';
  getEleid('LoaiSP').value = '';
  getEleid('XuatXuSP').value = '';
  getEleid('DungTichSP').value = '';
  getEleid('DoConSP').value = '';
  getEleid('GiaSP').value = '';
  getEleid('HinhSP').value = '';
  getEleid('MoTa').value = '';
};

const handleAddWine = () => {
  if (!validateModalForm()) return;

  const name = getEleid('TenSP').value;
  const type = getEleid('LoaiSP').value;
  const origin = getEleid('XuatXuSP').value;
  const volume = getEleid('DungTichSP').value;
  const alcoholContent = getEleid('DoConSP').value;
  const price = getEleid('GiaSP').value;
  const image = getEleid('HinhSP').value;
  const description = getEleid('MoTa').value;

  const wine = new Wine("", name, type, origin, volume, alcoholContent, price, image, description);

  const promise = api.addWine(wine);
  promise
    .then((result) => {
      console.log(result.data);
      alert(`Thêm rượu ${result.data.name} thành công!`);
      getListWine();
      clearModalInputs();
      document.getElementsByClassName('close')[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleAddWine = handleAddWine;

getEleid('btnThemSP').addEventListener('click', () => {
  document.getElementsByClassName('modal-title')[0].innerHTML = "Thêm Rượu";
  document.getElementsByClassName('modal-footer')[0].innerHTML = `
    <button class="btn btn-success" onclick="handleAddWine()">Thêm</button>
  `;
});

const handleAdd = () => {
  if (!validateModalForm()) return;

  const name = getEleid('TenSP').value;
  const type = getEleid('LoaiSP').value;
  const origin = getEleid('XuatXuSP').value;
  const volume = getEleid('DungTichSP').value;
  const alcoholContent = getEleid('DoConSP').value;
  const price = getEleid('GiaSP').value;
  const image = getEleid('HinhSP').value;
  const description = getEleid('MoTa').value;

  const wine = new Wine("", name, type, origin, volume, alcoholContent, price, image, description);
  
  const promise = api.addWine(wine);
  promise
      .then((result) => {
          console.log(result.data);
          alert(`Add ${result.data.name} success!!`);
          getListWine();
          clearModalInputs();
          document.getElementsByClassName('close')[0].click();
      })
      .catch((error) => {
          console.log(error);
      });
};
window.handleAdd = handleAdd;

const handleEdit = (id) => {
 document.getElementsByClassName('modal-title')[0].innerHTML = "Edit Wine";
 document.getElementsByClassName('modal-footer')[0].innerHTML = `
        <button class="btn btn-success" onclick="handleUpdate('${id}')">Update</button>
    `;
    const promise = api.getWineById(id);
    promise
        .then((result) => {
            const {data} = result;
            getEleid('TenSP').value = data.name;
            getEleid('LoaiSP').value = data.type;
            getEleid('XuatXuSP').value = data.origin;
            getEleid('DungTichSP').value = data.volume;
            getEleid('DoConSP').value = data.alcoholContent;
            getEleid('GiaSP').value = data.price;
            getEleid('HinhSP').value = data.image;
            getEleid('MoTa').value = data.description;
        })
        .catch((error) => {
            console.log(error);
        });       
};
window.handleEdit = handleEdit;

const handleUpdate = (id) => {
  if (!validateModalForm()) return;

  const name = getEleid('TenSP').value;
  const type = getEleid('LoaiSP').value;
  const origin = getEleid('XuatXuSP').value;
  const volume = getEleid('DungTichSP').value;
  const alcoholContent = getEleid('DoConSP').value;
  const price = getEleid('GiaSP').value;
  const image = getEleid('HinhSP').value;
  const description = getEleid('MoTa').value;

  const wine = new Wine(id, name, type, origin, volume, alcoholContent, price, image, description);
  
  const promise = api.updateWine(wine);
  promise
      .then((result) => {
          console.log(result.data);
          alert(`Update ${result.data.name} success!!`);
          getListWine();
          clearModalInputs();
          document.getElementsByClassName('close')[0].click();
      })
      .catch((error) => {
          console.log(error);
      });
};
window.handleUpdate = handleUpdate;