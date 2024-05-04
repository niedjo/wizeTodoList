import { useEffect, useState } from "react"
import { Autocomplete, Box, Paper, TextField } from "@mui/material"
import Modal from '@mui/material/Modal'
import Button, {  } from '@mui/material/Button'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { flex_column, flex_line, flex_line_label } from "./style";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Label, Todo } from './types';



function App() {

  const [Tasks, setTasks] = useState<Todo[]>()
  
  const [Row_tasks_list, setRow_tasks_list] = useState<{ Task_Title: string; Label: Label[]; Schedule: Date; }[]>([])
  
  useEffect(() => {

    const mock = new MockAdapter(axios);
    
    mock.onGet('/api/tasks').reply(200, 
      [
        {
          titre: "Check the documentation of audit",
          assignee: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
          },
          startDate: new Date("2024-05-10"),
          endDate: new Date("2024-05-15"),
          priority: "Basse",
          labels: ["red"],
          description: "This task involves carefully reviewing the documentation of the audit to ensure it is up-to-date and accurate. This may include searching for errors, updating outdated sections, and adding new information if necessary.",
        },
        {
          titre: "Arrange a trip for the best performing staff member",
          assignee: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
          },
          startDate: new Date("2024-05-12"),
          endDate: new Date("2024-05-17"),
          priority: "Haute",
          labels: ["green", "blue"],
          description: "This task involves organizing a trip for the best performing staff member as a form of recognition for their outstanding performance. This may include planning travel arrangements, accommodation, and activities to ensure an enjoyable experience for the recipient.",
        },
        {
          titre: "Arrange birthday party for the staff",
          assignee: {
            name: "Silvania Dane",
            email: "silvania.dane@example.com",
            phone: "987-654-4457",
          },
          startDate: new Date("2024-06-05"),
          endDate: new Date("2024-07-01"),
          priority: "Basse",
          labels: ["#333"],
          description: "This task involves organizing a birthday party for the staff members. The purpose is to celebrate their birthdays and foster a positive and inclusive work environment. This may include planning the party venue, decorations, food and drinks, and coordinating any activities or entertainment.",
        },
        {
          titre: "Call Adam to check the documentation",
          assignee: {
            name: "Yoan Dane",
            email: "yoan.dane@example.com",
            phone: "987-654-6673",
          },
          startDate: new Date("2024-06-12"),
          endDate: new Date("2024-06-17"),
          priority: "Basse",
          labels: ["green"],
          description: "This task involves contacting Adam to review the documentation. The purpose is to ensure accuracy and completeness by verifying information and addressing any discrepancies or updates that may be necessary.",
        },

        {
          titre: "Review quarterly financial report",
          assignee: {
            name: "Megane Walkman",
            email: "meganewalkman.smith@example.com",
            phone: "987-654-7783",
          },
          startDate: new Date("2024-03-12"),
          endDate: new Date("2024-04-17"),
          priority: "Moyenne",
          labels: ["green", "blue", "#333"],
          description: "Description: This task involves thoroughly examining the quarterly financial report to assess the company's financial performance and identify any trends, opportunities, or areas for improvement. The objective is to ensure accuracy, completeness, and clarity in the report, which will aid in making informed business decisions",
        },
        {
          titre: "Conduct market research for new product",
          assignee: {
            name: "Step Rane",
            email: "steprane@example.com",
            phone: "987-654-5555",
          },
          startDate: new Date("2024-07-05"),
          endDate: new Date("2024-07-10"),
          priority: "Basse",
          labels: ["#333"],
          description: "This task involves conducting market research to gather data and insights into consumer preferences, market trends, and competitive landscape for a new product launch. The goal is to gather relevant information that will inform product development, marketing strategies, and positioning in the marketplace",
        },
        {
          titre: "Organize team-building workshop",
          assignee: {
            name: "Leon Tiger",
            email: "leon.tiger@example.com",
            phone: "987-654-6683",
          },
          startDate: new Date("2024-06-12"),
          endDate: new Date("2024-06-17"),
          priority: "Basse",
          labels: ["green"],
          description: "This task involves planning and organizing a team-building workshop for the company's employees. The purpose of the workshop is to strengthen teamwork, improve communication, and foster collaboration among team members. Activities may include group exercises, icebreakers, and interactive sessions aimed at enhancing team dynamics and morale.",
        },
        // {
        //   titre: "Arrange a trip for the best performing staff member",
        //   assignee: {
        //     name: "Jane Smith",
        //     email: "jane.smith@example.com",
        //     phone: "987-654-3210",
        //   },
        //   startDate: new Date("2024-05-12"),
        //   endDate: new Date("2024-05-17"),
        //   priority: "Haute",
        //   labels: ["green", "blue"],
        //   description: "This task involves organizing a trip for the best performing staff member as a form of recognition for their outstanding performance. This may include planning travel arrangements, accommodation, and activities to ensure an enjoyable experience for the recipient.",
        // },
        // {
        //   titre: "Arrange birthday party for the staff",
        //   assignee: {
        //     name: "Silvania Dane",
        //     email: "silvania.dane@example.com",
        //     phone: "987-654-4457",
        //   },
        //   startDate: new Date("2024-06-05"),
        //   endDate: new Date("2024-07-01"),
        //   priority: "Basse",
        //   labels: ["#333"],
        //   description: "This task involves organizing a birthday party for the staff members. The purpose is to celebrate their birthdays and foster a positive and inclusive work environment. This may include planning the party venue, decorations, food and drinks, and coordinating any activities or entertainment.",
        // },
        // {
        //   titre: "Call Adam to check the documentation",
        //   assignee: {
        //     name: "Yoan Dane",
        //     email: "yoan.dane@example.com",
        //     phone: "987-654-6673",
        //   },
        //   startDate: new Date("2024-06-12"),
        //   endDate: new Date("2024-06-17"),
        //   priority: "Basse",
        //   labels: ["green"],
        //   description: "This task involves contacting Adam to review the documentation. The purpose is to ensure accuracy and completeness by verifying information and addressing any discrepancies or updates that may be necessary.",
        // },

        // {
        //   titre: "Review quarterly financial report",
        //   assignee: {
        //     name: "Megane Walkman",
        //     email: "meganewalkman.smith@example.com",
        //     phone: "987-654-7783",
        //   },
        //   startDate: new Date("2024-03-12"),
        //   endDate: new Date("2024-04-17"),
        //   priority: "Moyenne",
        //   labels: ["green", "blue", "#333"],
        //   description: "Description: This task involves thoroughly examining the quarterly financial report to assess the company's financial performance and identify any trends, opportunities, or areas for improvement. The objective is to ensure accuracy, completeness, and clarity in the report, which will aid in making informed business decisions",
        // },
        // {
        //   titre: "Conduct market research for new product",
        //   assignee: {
        //     name: "Step Rane",
        //     email: "steprane@example.com",
        //     phone: "987-654-5555",
        //   },
        //   startDate: new Date("2024-07-05"),
        //   endDate: new Date("2024-07-10"),
        //   priority: "Basse",
        //   labels: ["#333"],
        //   description: "This task involves conducting market research to gather data and insights into consumer preferences, market trends, and competitive landscape for a new product launch. The goal is to gather relevant information that will inform product development, marketing strategies, and positioning in the marketplace",
        // },
        // {
        //   titre: "Organize team-building workshop",
        //   assignee: {
        //     name: "Leon Tiger",
        //     email: "leon.tiger@example.com",
        //     phone: "987-654-6683",
        //   },
        //   startDate: new Date("2024-06-12"),
        //   endDate: new Date("2024-06-17"),
        //   priority: "Basse",
        //   labels: ["green"],
        //   description: "This task involves planning and organizing a team-building workshop for the company's employees. The purpose of the workshop is to strengthen teamwork, improve communication, and foster collaboration among team members. Activities may include group exercises, icebreakers, and interactive sessions aimed at enhancing team dynamics and morale.",
        // },
      ]
  )

    axios.get<Todo[]>('/api/tasks')
    .then(response => {
      // const date : Date = new Date().getMonth()
      setTasks(response.data)
      console.log(response.data);
    })
    .catch(error => console.log(error))
    
    return () => {
      mock.restore();
    };
  }, [])

  function formatDate (date : Date) : string {
    // const date = new Date(); // Remplacez ceci par votre date

    // Tableaux pour les noms abrégés des mois et les suffixes des jours
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daySuffixes = ['st', 'nd', 'rd', 'th'];

    // Récupérez les éléments de la date
    const month = monthNames[date.getMonth()]; // Mois
    const day = date.getDate(); // Jour
    const year = date.getFullYear(); // Année

    // Ajoutez un suffixe au jour si nécessaire
    let dayString = day.toString();
    if (day > 3 && day < 21) {
      dayString += daySuffixes[3];
    } else {
      dayString += daySuffixes[day % 10 - 1];
    }

    // Construisez la chaîne de date formatée
    const formattedDate = `${month} ${dayString}, ${year}`;

    return formattedDate // Affiche la date formatée

}

  useEffect(() => {
    // Vérifiez si Tasks existe et n'est pas vide
    if (Tasks) {
      // Utilisez map pour transformer chaque élément de Tasks en un objet correspondant à row_tasks_list
      const updatedRowTasksList = Tasks.map(t => ({
        Task_Title: t.titre,
        Label: t.labels,
        Schedule: t.endDate
      }));
      // Mettez à jour row_tasks_list avec le tableau mis à jour
      setRow_tasks_list(updatedRowTasksList);
      console.log(Row_tasks_list, Tasks);
    }
  }, [Tasks]);

  const Peoples = [
    {label : "darren", email : "darren@gmail.com", phone : "655059273"},
    {label : "sheldon", email : "sheldon@gmail.com", phone : "655059274"},
    {label : "niedjo", email : "niedjo@gmail.com", phone : "655059275"},
  ]

  const Label_list = [
    {label : 'CSS'},
    {label : 'Html'},
    {label : 'JQuery'},
    {label : 'Node.js'},
  ]
  // const Label_list = [
  //   {label : Label.CSS},
  //   {label : Label.HTML},
  //   {label : 'JQuery'},
  //   {label : 'Node.js'},
  // ]

  
  const [OpenModal, setOpenModal] = useState<boolean>(false)



  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const columns: GridColDef[] = [
    { field: 'Task_Title', headerName: 'Task_Title', width: 500 },
    { 
      field: 'Label', 
      headerName: 'Label', 
      sortable: false,
      renderCell : (params) => (
        <div style={{display : "flex", justifyContent : "end", alignItems : "end"}}>
          {params.value.map((color : string, index : number) => (
            <PlayArrowOutlinedIcon key={index} sx={{color : color}} />
          ))}
        </div>
      ),
      width: 120 
    },
    { 
      field: 'Schedule', 
      headerName: 'Schedule', 
      width: 200,
      renderCell : (params) => `${formatDate(new Date(params.value))}`,
    },
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
              width: "55%",
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              pt: 2,
              pb: 3,
            }}
          >
            <Box sx={{display : "flex", justifyContent : "space-between", alignItems : "center", px : 3, color : "#555"}}>
              <h3>Add New Task</h3>
              <div onClick={handleCloseModal} style={{cursor : "pointer"}}><CloseIcon /></div>
            </Box>
            <hr style={{width : "100%"}}/>
            <Box sx={{px : 4, pt : 3}}>
              <TextField id="outlined-basic" label="Task Title" variant="outlined" sx={{width : "100%"}}/>
              <br />
              <Box sx={{display : "flex", justifyContent : "space-between", alignItems : "center", py : 3}}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Peoples}
                  sx={{ width: "20%" }}
                  renderInput={(params) => <TextField {...params} label="Staff" />}
                />
                <TextField
                  type="date"
                  // value={""}
                  // onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Start Date"
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Peoples}
                  sx={{ width: "20%" }}
                  renderInput={(params) => <TextField {...params} label="Priority" />}
                />
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={Label_list}
                  getOptionLabel={(option) => option.label}
                  // defaultValue={[Label_list[1], Label_list[0]]}
                  renderInput={(params) => (
                    <TextField {...params} label="Label" placeholder="LabelName" />
                  )}
                  sx={{ width: '20%' }}
                />
              </Box>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                // defaultValue="Default Value"
                sx={{width : "100%", pb : 3}}
              />
              <hr style={{width : "100%"}}/>
            </Box>
            <Box sx={{display : "flex", justifyContent : "end", alignItems : "end", px : 3}}>
              <Button 
                onClick={() => setOpenModal(false)} 
                variant="outlined" 
                sx = {{
                  textTransform : "none",
                  mt : 3
                }}
              >
                Save
              </Button>
            </Box>
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

      <div style={{ height: "90vh", width: '65%', marginLeft : "4%", marginTop : 20, background : "#fff", borderRadius : 40 }}>
        <DataGrid
          rows={Row_tasks_list}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[8, 16]}
          sx={{
            borderRadius : 10,
            height : "90vh"
          }}
          checkboxSelection
          getRowId={(row) => row.Task_Title}
        />
      </div>
    </div>

  )
}

export default App
