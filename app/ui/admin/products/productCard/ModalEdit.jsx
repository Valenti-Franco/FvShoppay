import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./styles.module.scss";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const BodyProductEdit = ({
  idProducto,
  productEdit,
  handleChangeProduct,
  productPost,
  abrirCerrarModalInsertarProduct,
  abrirCerrarModalProduct,
  abrirCerrarModalImgProduct,
}) => {
  return (
    <div className={style.modal}>
      <div align="right"></div>
      <TextField
        value={productEdit.nombre}
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangeProduct}
      />
      <br />
      <TextField
        value={productEdit.precio}
        type="Number"
        name="precio"
        className={style.inputMaterial}
        label="Precio"
        onChange={handleChangeProduct}
      />
      <br />
      <TextareaAutosize
        style={{ maxHeight: "200px" }}
        value={productEdit.descripcion}
        name="descripcion"
        className={style.inputMaterial}
        label="Descripción"
        onChange={handleChangeProduct}
      />
      {/* <TextField
        value={productEdit.descripcion}
        name="descripcion"
        className={style.inputMaterial}
        label="Descripción"
        onChange={handleChangeProduct}
      /> */}
      <br />
      <TextField
        value={productEdit.stock}
        type="Number"
        name="stock"
        className={style.inputMaterial}
        label="Stock"
        onChange={handleChangeProduct}
      />
      <br />
      <br />

      <div align="right">
        {/* onClick={() => productPost(idProducto)} */}
        <Button color="primary">Guardar Cambios</Button>
        <Button onClick={() => abrirCerrarModalProduct()}>Cancelar</Button>
      </div>
    </div>
  );
};

export default BodyProductEdit;
