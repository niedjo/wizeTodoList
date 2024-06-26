import { useEffect, useState } from "react"
// les composant mui
import { Autocomplete, Box, Paper, TextField } from "@mui/material"
import Modal from '@mui/material/Modal'
import Button, {  } from '@mui/material/Button'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// les composant de styles
import { flex_column, flex_line, flex_line_label } from "./style";

// les composant d'API
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// les types (Models)
import { Assignee, Label, Priority, Todo, TodoShowed } from './types';



function App() {
  
  const [AllTasks, setAllTasks] = useState<Todo[]>()
  const [Tasks, setTasks] = useState<Todo[]>()

  const [Staff, setStaff] = useState<Assignee[]>()
  const [Row_tasks_list, setRow_tasks_list] = useState<TodoShowed[]>([])


  // fonction pour le formatag de date pour le Schedude
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
    const formattedDate = `Schedule for ${month} ${dayString}, ${year}`;

    return formattedDate // Affiche la date formatée

}

// on recupere les donnees
  
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
          endDate: null,
          priority: "LOW",
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
          endDate: null,
          priority: "HIGH",
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
          startDate: new Date("2024-05-05"),
          endDate: new Date("2024-07-01"),
          priority: "LOW",
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
          endDate: null,
          priority: "LOW",
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
          priority: "MEDIUM",
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
          priority: "LOW",
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
          priority: "LOW",
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

    mock.onGet('api/staffs').reply(200,
      [
        {name : "John Doe", email : "john.doe@example.com", phone : "123-456-7890"},
        {name : "Jane Smith", email : "jane.smith@example.com", phone : "987-654-3210"},
        {name : "Silvania Dane", email : "silvania.dane@example.com", phone : "987-654-4457"},
        {name : "Yoan Dane", email : "yoan.dane@example.com", phone : "987-654-6673"},
        {name : "Step Rane", email : "steprane@example.com", phone : "987-654-5555"},
        {name : "Leon Tiger", email : "leon.tiger@example.com", phone : "987-654-6683"},
      ]
    )

    // on recupere les taches
    axios.get<Todo[]>('/api/tasks')
    .then(response => {
      setAllTasks(response.data)
      setTasks(response.data)
    })
    .catch(error => console.log(error))

    // on recupere les membres du personnel (Assignee)
    axios.get<Assignee[]>('/api/staffs')
    .then(response => {
      setStaff(response.data)
    })
    .catch(error => console.log(error))
    
    return () => {
      mock.restore();
    };
  }, [])

  // on recuperes les lignes du datagrid

  useEffect(() => {
    // Vérifiez si Tasks existe et n'est pas vide
    if (AllTasks) {
      // Utilisez map pour transformer chaque élément de Tasks en un objet correspondant à row_tasks_list
      const updatedRowTasksList : TodoShowed = AllTasks.map(t => ({
        Task_Title: t.titre,
        Label: t.labels,
        Delete : t.titre,
        Completed : t.titre,
        Schedule: t.startDate
      }));
      // Mettez à jour row_tasks_list avec le tableau mis à jour
      setRow_tasks_list(updatedRowTasksList);
      console.log(Row_tasks_list, AllTasks);
    }
  }, [AllTasks]);

  const Staff_Names : string[] | undefined = Staff?.map(s => s.name)
  const priority_list : Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH]
  const Label_list : string[] = [
    'CSS',
    'Html',
    'JQuery',
    'Node.js',
  ]

  // la gestion des tabs

  const [IsTask, setIsTask] = useState<boolean>(true)
  const [IsAll, setIsAll] = useState<boolean>(true)
  const [IsPriority, setIsPriority] = useState<boolean>(false)
  const [IsToday, setIsToday] = useState<boolean>(false)
  const [IsCompleted, setIsCompleted] = useState<boolean>(false)

  const handleIsTask = () => {
    setIsAll(true)
    setIsPriority(false)
    setIsToday(false)
    setIsCompleted(false)

    if (AllTasks) {const updatedRowTasksList : TodoShowed[] = AllTasks.map(t => ({
      Task_Title: t.titre,
      Label: t.labels,
      Delete : t.titre,
      Completed : t.titre,
      Schedule: t.startDate
    }));
    // Mettez à jour row_tasks_list avec le tableau mis à jour
    setRow_tasks_list(updatedRowTasksList);}
  }

  const handleIsPriority = () => {
    setIsAll(false)
    setIsPriority(true)
    setIsToday(false)
    setIsCompleted(false)

    const updatedRowTasksList : TodoShowed[] = []

    if (AllTasks) {
      for (let i = 0; i < AllTasks.length; i++) {
        const element = AllTasks[i];
        if (element.priority === Priority.LOW) {
          updatedRowTasksList[i] = {
              Task_Title: element.titre,
              Label: element.labels,
              Delete : element.titre,
              Completed : element.titre,
              Schedule: element.startDate
          }
        }
      }

      setRow_tasks_list(updatedRowTasksList);
    }


    // const updatedRowTasksList : TodoShowed[] = AllTasks.map(t => ({
    //   Task_Title: t.titre,
    //   Label: t.labels,
    //   Delete : t.titre,
    //   Completed : t.titre,
    //   Schedule: t.startDate
    // }));
    // Mettez à jour row_tasks_list avec le tableau mis à jour
    setRow_tasks_list(updatedRowTasksList);
    console.log(Row_tasks_list, AllTasks);
  }

  const handleIsToday = () => {
    setIsAll(false)
    setIsPriority(false)
    setIsToday(true)
    setIsCompleted(false)

    const updatedRowTasksList : TodoShowed[] = []

    if (AllTasks) {
      for (let i = 0; i < AllTasks.length; i++) {
        const element = AllTasks[i];
        if (new Date(element.startDate).toLocaleDateString() === new Date().toLocaleDateString()) {
          updatedRowTasksList[i] = {
              Task_Title: element.titre,
              Label: element.labels,
              Delete : element.titre,
              Completed : element.titre,
              Schedule: element.startDate
          }
        }
      }

      setRow_tasks_list(updatedRowTasksList);
    }


    // const updatedRowTasksList : TodoShowed[] = AllTasks.map(t => ({
    //   Task_Title: t.titre,
    //   Label: t.labels,
    //   Delete : t.titre,
    //   Completed : t.titre,
    //   Schedule: t.startDate
    // }));
    // Mettez à jour row_tasks_list avec le tableau mis à jour
    setRow_tasks_list(updatedRowTasksList);
    console.log(Row_tasks_list, AllTasks);
  }

  const handleIsComplete = () => {
    setIsAll(false)
    setIsPriority(false)
    setIsToday(false)
    setIsCompleted(true)

    const updatedRowTasksList : TodoShowed[] = []

    if (AllTasks) {
      for (let i = 0; i < AllTasks.length; i++) {
        const element = AllTasks[i];
        if (element.endDate !== null) {
          updatedRowTasksList[i] = {
              Task_Title: element.titre,
              Label: element.labels,
              Delete : element.titre,
              Completed : element.titre,
              Schedule: element.startDate
          }
        }
      }

      setRow_tasks_list(updatedRowTasksList);
    }


    // const updatedRowTasksList : TodoShowed[] = AllTasks.map(t => ({
    //   Task_Title: t.titre,
    //   Label: t.labels,
    //   Delete : t.titre,
    //   Completed : t.titre,
    //   Schedule: t.startDate
    // }));
    // Mettez à jour row_tasks_list avec le tableau mis à jour
    setRow_tasks_list(updatedRowTasksList);
    console.log(Row_tasks_list, AllTasks);
  }

  // la gestion du modale

  // const task_title_value = useRef<Variant extends TextFieldVariants | null?>(null)
  
  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [staffState, setStaffState] = useState<string>('')
  const [startDateState, setStartDateState] = useState<string>('')
  const [priorityState, setPriorityState] = useState<Priority | null>(Priority.LOW)
  const [labelState, setLabelState] = useState<string[]>([])
  const [descriptionState, setDescriptionState] = useState<string>('')

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  // la gestion du personnel

  const [nameOfNewStaff, setnameOfNewStaff] = useState<string>('')
  const [IsValidName, setIsValidName] = useState<boolean>(false)

  const handleChangeNameOfNewStaff = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    const valueOfField : string = e.target.value

    if (Staff) {
      for (let i = 0; i < Staff.length; i++) {
        const element = Staff[i].name;
        // if (valueOfField.length === 0) {
        //   setIsValidName(false)
        //   break
        // }
        if (element === valueOfField || valueOfField.length < 3) {
          setIsValidName(true)
          break
        }
        else {
          setIsValidName(false)
        }
        
      }
    }
    setnameOfNewStaff(valueOfField)
  }

  const [emailOfNewStaff, setemailOfNewStaff] = useState<string>('')
  const [IsValidEmail, setIsValidEmail] = useState<boolean>(false)

  const handleChangeEmailOfNewStaff = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const valueOfField : string = e.target.value

    if (valueOfField.includes('@') && valueOfField.length !== 0) {
      setIsValidEmail(false)
    }
    else {
      setIsValidEmail(true)
    }

    setemailOfNewStaff(valueOfField)
  }

  const [PhoneOfNewStaff, setPhoneOfNewStaff] = useState<string>('')

  // le submit des taches : (penser a verifier le length de chaque veleur du state avant de soumettre)

  const submitNewStaff = () => {
    if (
      (nameOfNewStaff.length === 0 || IsValidName === true)
      || (emailOfNewStaff.length === 0 || IsValidEmail === true)
      || (PhoneOfNewStaff.length === 0)
    ) {
      alert("incorrect value of field, please try again")
      return
    }

    else {
      if (Staff) {
        const newStaffList : Assignee[] = Staff.slice()
        newStaffList.push({
          name : nameOfNewStaff.trim(),
          email : emailOfNewStaff,
          phone : PhoneOfNewStaff
        })

        setStaff(newStaffList)

        alert("Staff succesfuly saved")
      }
    }
  }

  const [IsUpdateStaff, setIsUpdateStaff] = useState<boolean>(false)
  const [StaffID, setStaffID] = useState<string>("")
  
  const updateStaff = (param : string) => {
    setIsUpdateStaff(true)
    if (Staff) {
      const NewStaff : Assignee[] = Staff.slice()
      const index : number = NewStaff.findIndex(n => n.name === param)

      setStaffID(Staff[index].name)
      setnameOfNewStaff(Staff[index].name)
      setemailOfNewStaff(Staff[index].email)
      setPhoneOfNewStaff(Staff[index].phone)

      setOpenModal(true)
    }
  }

  const updateEffectiveStaff = () => {
    if (Staff) {
      const NewStaff : Assignee[] = Staff.slice()
      const index : number = NewStaff.findIndex(n => n.name === StaffID)
      
      if (
        (nameOfNewStaff.length === 0 || IsValidName === true)
        || (emailOfNewStaff.length === 0 || IsValidEmail === true)
        || (PhoneOfNewStaff.length === 0)
      ) {
        alert("incorrect value of field, please try again")
        return
      }

      NewStaff[index].name = nameOfNewStaff
      NewStaff[index].email = emailOfNewStaff
      NewStaff[index].phone = PhoneOfNewStaff

      setStaff(NewStaff)

      setnameOfNewStaff("")
      setemailOfNewStaff("")
      setPhoneOfNewStaff("")

      alert("staff updated sucessfuly")

      setIsUpdateStaff(false)
    }
  }
  // la gestion des taches

  const [taskTitleState, setTaskTitleState] = useState<string>('')
  const [IsValidTaskTitle, setIsValidTaskTitle] = useState<boolean>(false)

  const handleChangeTaskTitle = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const valueOfField : string = e.target.value

    if (valueOfField.length < 3) {
      setIsValidTaskTitle(true)
    }
    else {
      setIsValidTaskTitle(false)
    }

    setTaskTitleState(valueOfField)
  }

  const submitNewTask = () => {

    if (IsValidTaskTitle || taskTitleState.length === 0 
    || staffState.length === 0) {
      alert("incorrect value of field, please try again")
      return
    }

    if (AllTasks) {

      // on conerti le tableau de label

      const label_copied : Label[] = []

      for (let i = 0; i < labelState.length; i++) {
        if (labelState[i] === "Html") {
          label_copied[i] = Label.HTML
        }
        else if (labelState[i] === "CSS") {
          label_copied[i] = Label.CSS
        }
        else if (labelState[i] === "JQuery") {
          label_copied[i] = Label.JQUERY
        }
        else if(labelState[i] === "Node.js") {
          label_copied[i] = Label.NODEJS
        }
        
      }

      // on cherche l'email et le phone du personnel

      let email_to_submit : string = ""
      let phone_to_submit : string = ""
      
      if (Staff) {
        for (let i = 0; i < Staff.length; i++) {
          const element = Staff[i];
          if (element.name === staffState) {
            email_to_submit = element.email
            phone_to_submit = element.phone
          }
        }
      }
      

      const newTask : Todo[] = AllTasks.slice()
      newTask.push({
        titre : taskTitleState.trim(), 
        assignee : {name : staffState, email : email_to_submit, phone : phone_to_submit}, 
        startDate : new Date(startDateState), 
        endDate : null, 
        priority : priorityState, 
        labels : label_copied, 
        description : descriptionState
      })
  
      setAllTasks(newTask)

      alert("Task saved succesfuly")

    }
  }

      // en considerant le titre d'une tache unique
  
  const [TaskTitleID, setTaskTitleID] = useState<string>('')
  const [IsToUpdate, setIsToUpdate] = useState<boolean>(false)

  const updateTask = (taskTitle : string) => {
    setIsToUpdate(true)
    if (AllTasks) {
      const NewAllTask : Todo[] = AllTasks.slice()
      const index : number = NewAllTask.findIndex(n => n.titre === taskTitle)

      const label_copied : string[] = []

      for (let i = 0; i < AllTasks[index].labels.length; i++) {
        const element = AllTasks[index].labels[i]
        if (element === Label.HTML) {
          label_copied[i] = "Html"
        }
        else if (element === Label.CSS) {
          label_copied[i] = "CSS"
        }
        else if (element === Label.JQUERY) {
          label_copied[i] = "JQuery"
        }
        else if(element === Label.NODEJS) {
          label_copied[i] = "Node.js"
        }
        
      }

      setTaskTitleID(AllTasks[index].titre) // apres on fait les id recoit ...
      setTaskTitleState(AllTasks[index].titre)
      setStaffState(AllTasks[index].assignee.name)
      const dateee = `${new Date(AllTasks[index].startDate).getFullYear()}-${new Date(AllTasks[index].startDate).getMonth().toString().padStart(2, "0")}-${new Date(AllTasks[index].startDate).getDate().toString().padStart(2, "0")}`
      setStartDateState(dateee)
      setPriorityState(AllTasks[index].priority)
      setLabelState(label_copied)
      setDescriptionState(AllTasks[index].description)


      setOpenModal(true)
    }
  }

  const updateEffectiveTask = () => {
    if (IsValidTaskTitle || taskTitleState.length === 0 
      || staffState.length === 0) {
        alert("incorrect value of field, please try again")
        return
    }

    if (AllTasks) {
      const NewAllTask : Todo[] = AllTasks.slice()
      const index : number = NewAllTask.findIndex(n => n.titre === TaskTitleID)

      if (NewAllTask[index].endDate !== null) {
        alert("this task can't be updated")
        setIsToUpdate(false)
        return
      }

      const label_copied : Label[] = []

      for (let i = 0; i < labelState.length; i++) {
        if (labelState[i] === "Html") {
          label_copied[i] = Label.HTML
        }
        else if (labelState[i] === "CSS") {
          label_copied[i] = Label.CSS
        }
        else if (labelState[i] === "JQuery") {
          label_copied[i] = Label.JQUERY
        }
        else if(labelState[i] === "Node.js") {
          label_copied[i] = Label.NODEJS
        }
        
      }

      let email_to_submit : string = ""
      let phone_to_submit : string = ""
      
      if (Staff) {
        for (let i = 0; i < Staff.length; i++) {
          const element = Staff[i];
          if (element.name === staffState) {
            email_to_submit = element.email
            phone_to_submit = element.phone
          }
        }
      }

      NewAllTask[index].titre = taskTitleState
      NewAllTask[index].assignee.name = staffState
      NewAllTask[index].assignee.email = email_to_submit
      NewAllTask[index].assignee.phone = phone_to_submit
      NewAllTask[index].startDate = new Date(startDateState)
      NewAllTask[index].endDate = null
      NewAllTask[index].priority = priorityState
      NewAllTask[index].labels = label_copied
      NewAllTask[index].description = descriptionState

      setAllTasks(NewAllTask)

      setTaskTitleID("") 
      setTaskTitleState("")
      setStaffState("")
      setStartDateState("")
      setPriorityState()
      setLabelState([])
      setDescriptionState("")

      alert("task updated succesfuly")
      setIsToUpdate(false)

    }
  }

  const updateCompletedTask = (taskTitle : string) => {
    if (AllTasks) {
      const NewAllTask : Todo[] = AllTasks.slice()
      const index : number = NewAllTask.findIndex(n => n.titre === taskTitle)
  
      if (NewAllTask[index].endDate !== null) {
        alert("task is yet done")
      }
      else {
        NewAllTask[index].endDate = new Date()
        alert("task is pass as done")
        console.log(NewAllTask[index]);
      }
  
      setAllTasks(NewAllTask)
    }
  }

  const deteleTask = (taskTitle : string) => {
    if (AllTasks) {
      const NewAllTask : Todo[] = AllTasks.slice()
      const index : number = NewAllTask.findIndex(n => n.titre === taskTitle)
      NewAllTask.splice(index, 1)
      setAllTasks(NewAllTask)
    }

  }


  const columnsOfTask: GridColDef[] = [
    { 
      field: 'Task_Title', 
      headerName: 'Task_Title', 
      width: 400,
      renderCell : (params) => {
        let canUpdateTask : boolean = false
        if (Tasks){
          const index : number = Tasks.findIndex(a => a.titre === params.value)
          if (index !== -1 && Tasks[index].endDate !== undefined) {
            if (Tasks[index].endDate === null) {
              canUpdateTask = true
            }
            else {
              canUpdateTask = false
            }
          }
        }
        return(
        <div onClick={canUpdateTask ? () => updateTask(params.value) : () => {alert("this task can't be updated")}} style={{cursor : "pointer"}}>
          {params.value}
        </div>
      )
    }, 
      editable: false 
    },
    { 
      field: 'Label', 
      headerName: 'Label', 
      sortable: false,
      renderCell : (params) => (
        <div style={{display : "flex", justifyContent : "end", alignItems : "center"}}>
          {params.value.map((color : string, index : number) => (
            <PlayArrowOutlinedIcon key={index} sx={{color : color}} />
          ))}
        </div>
      ),
      width: 100,
      editable: false
    },
    { 
      field: 'Delete', 
      headerName: 'Delete Task', 
      width: 100,
      renderCell : (params) => (<div onClick={() => deteleTask(params.value)} style={{cursor : "pointer"}}>
        <DeleteForeverIcon sx={{color : "red"}}/>
      </div>),
      editable: false
    },
    { 
      field: 'Completed', 
      headerName: 'Completed', 
      width: 100,
      renderCell : (params) => {
        let color : string = ""
        if (Tasks){
          const index : number = Tasks.findIndex(a => a.titre === params.value)
          if (index !== -1 && Tasks[index].endDate !== undefined) {
            if (Tasks[index].endDate === null) {
              color = "#333"
            }
            else {
              color = "blue"
            }
          }
          // console.log(index);
        }
        return (<div onClick={() => updateCompletedTask(params.value)} style={{cursor : "pointer"}}>
          <CheckCircleOutlineIcon sx={{color : `${color}`}}/>
        </div>)
      },
      editable: false
    },
    { 
      field: 'Schedule', 
      headerName: 'Schedule', 
      width: 250,
      renderCell : (params) => `${formatDate(new Date(params.value))}`,
      editable: false
    },
  ];

  const columnsOfStaff: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 200, 
      renderCell : (params) => (<div onClick={() => updateStaff(params.value)} style={{cursor : "pointer"}}>
        {params.value}
      </div>), 
      editable: false 
    },
    { field: 'email', headerName: 'Email', sortable: false,width: 280,editable: false},
    { field: 'phone', headerName: 'Phone', width: 250,editable: false}
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
          {IsTask ? "+ Add New Task" : "+ Add New Staff"} 
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
            {
              IsTask ? 
            <div>
              <Box sx={{display : "flex", justifyContent : "space-between", alignItems : "center", px : 3, color : "#555"}}>
                <h3>Add New Task</h3>
                <div onClick={handleCloseModal} style={{cursor : "pointer"}}><CloseIcon /></div>
              </Box>
              <hr style={{width : "100%"}}/>
              <Box sx={{px : 4, pt : 3}}>
                <TextField 
                    error={IsValidTaskTitle}
                    id="outlined-basic" 
                    label="Task Title" 
                    variant="outlined" 
                    sx={{width : "100%"}} 
                    helperText={IsValidTaskTitle && "more than 3 characters"}
                    value={taskTitleState}
                    onChange={handleChangeTaskTitle}
                />
                <br />
                <Box sx={{display : "flex", justifyContent : "space-between", alignItems : "center", py : 3}}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Staff_Names}
                    sx={{ width: "20%" }}
                    renderInput={(params) => <TextField {...params} label="Staff" />}
                    value={staffState}
                    onChange={(e : any, newValue : string) => {setStaffState(newValue)}}
                  />
                  <TextField
                    type="date"
                    value={startDateState}
                    onChange={(e) => {setStartDateState(e.target.value); console.log(startDateState);}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Start Date"
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={priority_list}
                    sx={{ width: "20%" }}
                    renderInput={(params) => <TextField {...params} label="Priority" />}
                    value={priorityState}
                    onChange={(e : any, newValue : string) => {setPriorityState(newValue)}}
                  />
                  <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={Label_list}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField {...params} label="Label" placeholder="LabelName" />
                    )}
                    sx={{ width: '20%' }}
                    value={labelState}
                    onChange={(e : any, newValue : string[]) => {setLabelState(newValue)}}
                  />
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  sx={{width : "100%", pb : 3}}
                  value={descriptionState}
                  onChange={(e) => {setDescriptionState(e.target.value)}}
                />
                <hr style={{width : "100%"}}/>
              </Box>
              <Box sx={{display : "flex", justifyContent : "end", alignItems : "end", px : 3}}>
                <Button 
                  onClick={!IsToUpdate ? submitNewTask : updateEffectiveTask} 
                  variant="outlined" 
                  sx = {{
                    textTransform : "none",
                    mt : 3
                  }}
                >
                  Save
                </Button>
              </Box>
            </div>
            :
            <div>
              <Box sx={{display : "flex", justifyContent : "space-between", alignItems : "center", px : 3, color : "#555"}}>
                <h3>Add New Staff</h3>
                <div onClick={handleCloseModal} style={{cursor : "pointer"}}><CloseIcon /></div>
              </Box>
              <hr style={{width : "100%"}}/>
              <Box sx={{px : 4, pt : 3}}>
                <TextField 
                    error={IsValidName}
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined" 
                    sx={{width : "100%", pb : 3}} 
                    helperText={IsValidName && "more than 3 characters an unique"}
                    value={nameOfNewStaff}
                    onChange={handleChangeNameOfNewStaff}
                />
                <TextField 
                    error={IsValidEmail}
                    id="outlined-basic" 
                    label="Email"
                    type="email" 
                    variant="outlined" 
                    sx={{width : "100%", pb : 3}} 
                    helperText={IsValidEmail && "must contain a @ character"}
                    value={emailOfNewStaff}
                    onChange={handleChangeEmailOfNewStaff}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Phone" 
                    variant="outlined" 
                    sx={{width : "100%"}} 
                    value={PhoneOfNewStaff}
                    onChange={
                      (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
                      {setPhoneOfNewStaff(e.target.value)}
                    }
                />
              </Box>
              <Box sx={{display : "flex", justifyContent : "end", alignItems : "end", px : 3}}>
                <Button 
                  onClick={IsUpdateStaff? updateEffectiveStaff : submitNewStaff} 
                  variant="outlined" 
                  sx = {{
                    textTransform : "none",
                    mt : 3
                  }}
                >
                  Save
                </Button>
              </Box>
            </div> 
            }
          </Box>
      </Modal>

      { IsTask &&
      (<Box sx={{ ...flex_column, pt : 4 }}>
        <Button onClick={handleIsTask} variant={IsAll ? "contained" : "outlined"} sx={{textTransform : "none", width : "90%",  margin : 0.5}} startIcon={<PeopleOutlinedIcon/>}>All</Button>
        <Button onClick={handleIsPriority} variant={IsPriority ? "contained" : "outlined"} sx={{textTransform : "none", width : "90%",  margin : 0.5}} startIcon={<DoubleArrowIcon />}>Priority</Button>
        <Button onClick={handleIsToday} variant={IsToday ? "contained" : "outlined"} sx={{textTransform : "none", width : "90%",  margin : 0.5}} startIcon={<DateRangeIcon />}>Today</Button>
        <Button onClick={handleIsComplete} variant={IsCompleted ? "contained" : "outlined"} sx={{textTransform : "none", width : "90%",  margin : 0.5}} startIcon={<CheckCircleOutlineIcon />}>Completed</Button>
      </Box>)
      }

      {IsTask && <Box sx={{...flex_column, pt : 10}}>
        <h4>Labels</h4>
        <Box sx={{...flex_column, justifyContent : "space-evenly", height : "25vh"}}>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "red"}} /> <div style={{marginLeft : 5}}>Html</div></div>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "blue"}} /> <div style={{marginLeft : 5}}>CSS</div></div>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "green"}} /> <div style={{marginLeft : 5}}>JQuery</div></div>
          <div style={{...flex_line_label}}><PlayArrowOutlinedIcon sx={{color : "#333"}} /> <div style={{marginLeft : 5}}>Node.js</div></div>
        </Box>
      </Box>
      }
    </Paper>

      <div style={{...flex_column, height: "90vh", width: '73%', marginLeft : "2%", marginTop : 20, }}>
        <div style={{...flex_line, justifyContent : "space-evenly", alignItems : "center", width: '100%'}}>
          <Button 
            variant={ IsTask? "contained" : "outlined" } 
            sx={{
              textTransform : "none",
              borderRadius : 5,
              px : 5,
              py : 1,
              fontWeight : "bold",
            }}
            onClick={() => setIsTask(true)}
            >Tasks</Button>
          <Button 
            variant={ IsTask? "outlined" : "contained" } 
            sx={{
              textTransform : "none",
              borderRadius : 5,
              px : 5,
              py : 1,
              fontWeight : "bold",
            }}
            onClick={() => setIsTask(false)}
            >Staff</Button>
        </div>
        <div 
          style={{ 
            height: "90vh", 
            width: '100%', 
            marginLeft : "2%", 
            marginTop : 20, 
            background : "#fff", 
            borderRadius : 40 
            }}
        >
          { IsTask ?
            <DataGrid
              rows={Row_tasks_list}
              columns={columnsOfTask}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 8 },
                },
              }}
              pageSizeOptions={[8, 16]}
              sx={{
                borderRadius : 10,
                height : "81vh"
              }}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={(row) => row && row.Task_Title ? row.Task_Title : ''}
            /> 
            :
            <DataGrid
              rows={Staff}
              columns={columnsOfStaff}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{
                borderRadius : 10,
                height : "81vh"
              }}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={(row) => row.name}
            />
          }
        </div>
      </div>
    </div>

  )
}

export default App
