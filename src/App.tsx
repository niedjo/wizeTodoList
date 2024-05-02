import { useState } from "react"
import { Box, Paper } from "@mui/material"
import Modal from '@mui/material/Modal'
import Button, {  } from '@mui/material/Button'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { flex_column, flex_line, flex_line_label } from "./style";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function App() {
  const [OpenModal, setOpenModal] = useState< boolean >(false)
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <div className="container" style={flex_line}>

      {/* le paper pour la navigation */}

      <Paper
        sx={{
          width : "17%",
          height : "85vh",
          padding : 3,
          margin : 2,
          borderRadius : 5
        }}
        elevation={10}
      >
        
        {/* le modal */}

        <Button
          variant="outlined"
          sx={{
            textTransform : "none",
            borderRadius : 5,
            px : 5,
            py : 1,
            fontWeight : "bold",
            // color : "ButtonHighlight"
          }}
          onClick={handleOpenModal}
        >
          + Add New Task
        </Button>


        <Modal
          open={OpenModal}
          onClose={handleCloseModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box 
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
            }}
          >
            <h2 id="child-modal-title">Text in a child modal</h2>
            <hr style={{width : "100%"}}/>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={() => setOpenModal(false)}>Close Child Modal</Button>
          </Box>
      </Modal>

      <Box sx={{ ...flex_column, pt : 4 }}>
        <Button sx={{textTransform : "none"}} startIcon={<PeopleOutlinedIcon />}>All</Button>
        <Button sx={{textTransform : "none"}} startIcon={<DoubleArrowIcon />}>Priority</Button>
        <Button sx={{textTransform : "none"}} startIcon={<DateRangeIcon />}>Today</Button>
        <Button sx={{textTransform : "none"}} startIcon={<CheckCircleOutlineIcon />}>Completed</Button>
      </Box>

      <Box sx={{...flex_column, pt : 10}}>
        <h4>Labels</h4>
        <Box sx={{...flex_column, justifyContent : "space-evenly", height : "25vh"}}>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "red"}} /> <div style={{marginLeft : 5}}>Html</div></div>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "blue"}} /> <div style={{marginLeft : 5}}>CSS</div></div>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "green"}} /> <div style={{marginLeft : 5}}>JQuery</div></div>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "#333"}} /> <div style={{marginLeft : 5}}>Node.js</div></div>
        </Box>
      </Box>

      


      </Paper>

      <div style={{ height: 400, width: '65%', marginLeft : "4%", marginTop : 20 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{borderRadius : 10}}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default App
