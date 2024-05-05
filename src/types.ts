export type Assignee = {
    name : string; 
    email : string; 
    phone : string;
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export enum Label {
    HTML = "red",
    CSS = "blue",
    JQUERY = "green",
    NODEJS = "#333"
}

export type Todo = {
    titre: string;
    assignee: Assignee;
    startDate: Date;
    endDate: Date | null;
    priority: Priority;
    labels: Label[];
    description: string;
};

export type TodoShowed = { 
    Task_Title: string; 
    Label: Label[]; 
    Delete : string; 
    Completed : string; 
    Schedule: Date; 
}
  