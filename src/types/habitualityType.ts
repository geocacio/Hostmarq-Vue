export interface Action{
    name: string;
    action: (item: any) => void;
    icon: string;
    class: string;
}