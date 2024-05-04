type Assignee = {
    name : string; 
    email : string; 
    phone : string;
}

enum Priority {
    LOW = 'Basse',
    MEDIUM = 'Moyenne',
    HIGH = 'Haute',
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
    endDate: Date;
    priority: Priority;
    labels: Label[];
    description: string;
};
  