import React, { useState } from "react";
import { Card, CardContent, CardHeader, Grid } from "semantic-ui-react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditModal from "./EditModal";

const CardStyle = ({ data, handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid.Column style={{ marginBottom: "30px" }} width={4}>
        <Card className="cardWrap" style={{ width: "100%" }}>
          <CardContent>
            <CardHeader>
              {data.firstName} {data.lastName}
            </CardHeader>
            <div>
              <p>Gender: {data.gender}</p>
              <p>Checkbox: {data.checkbox ? "True" : "False"}</p>
              <p>Radio: {data.radio ? "True" : "False"}</p>
            </div>
          </CardContent>
        </Card>
        <AiOutlineDelete
          onClick={() => handleDelete(data.id)}
          className="delete"
        />
        <AiOutlineEdit onClick={() => setOpen(true)} className="edit" />
      </Grid.Column>
      <>
        {open && (
          <EditModal
            data={data}
            setOpen={setOpen}
            open={open}
            handleEdit={handleEdit}
          ></EditModal>
        )}
      </>
    </>
  );
};

export default CardStyle;
