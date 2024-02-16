/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable max-len */
export type RouteType = {
  routeNumber:        number;
  floor:              string;
  id:                 number;
  title:              string;
  description?:       string;
  userName:           string;
  endDate:            string;
  startDate:          string;
  startTime:          string;
  endTime:            string;
  problemCount:       number;
  userRole:           string;
  secret:             string;
  itemId:             string;
};

export type AreaType = {
  id:                 number;
  routesId:           number;
  areaNumber:         string;
  roomName:           string;
};

export type TodoType = {
  areasId:            number;
  duty:               string;
  id:                 number;
};

export type PossibleProblemsType = {
  id:                 number;
  todoId:             number;
  possibleProblem:    string;
  reaction:           string;
};

export type HistoryDataType = {
  startDate:          string;
  startTime:          string;
  endDate:            string;
  endTime:            string;
  routeNumber:        number | undefined;
  id:                 number;
  userName:           string;
  problemCount:       number;
  pageID:             number;
  routenumber:        number;
  _id:                string;
  secret:             string;
  userRole:           string;
  filledData: {
    values: {
      [key: string]: {
        [key: string]: boolean
        }[]
    },
    pageID:           number;
    routeNumber:      number;
  }[]
  values: {
      [key: string]: {
        [key: string]: boolean;
      }[],
    },

};

export type UserType = {
  id:             number;
  email:          string;
  isAdmin:        boolean;
  isSecurity:     boolean;
  name:           string;
  username:       string;
  created:        string;
  disabledDate:   string;
  isDisabled:     boolean;
  _id:            string;
};

export type TokenType = {
  email:  string;
  exp:    number;
  iat:    number;
  userId: string;
};

export type ChecklistPhotosType = {
  photo:              string;
  photoId:            string;
}

export type ColocationDataType = {
  [key: string]: string[];
};

export type CompaniesType = {
  document:         string[]
  _id:              string;
  id:               number;
  parentId?: string;
  name:             string;
  racks:            any[]
  code:             string | undefined;
  description:      string;
  photo:            string;
};

export type CompanyInfoType = {
  [site: string]: ColocationDataType[] | undefined;
} & {
  companyName: string;
  companyCode: string;
  companyDescription: string;
  companyPhoto: string;
  subClient?: {
    subClientId: string;
    subClientCompanyName: string;
  }[];
};
export type CompaniesSitesType = {
  _id:                string;
  id:                 string;
  CompanyId:          string;
  AvailableSites:     string;
}

export type CompaniesPremisesType = {
  _id:                string;
  id:                 string;
  siteId:             string;
  premiseName:        string;
}
export type CompaniesColocationType = {
  _id:                string;
  id:                 string;
  RackNumber:         string;
  PremiseId:          string;
  CompanyId:          string;
}

export type CompaniesEmlployeesType = {
  _id:                string;
  id:                 string;
  CompanyId:          string;
  employee_name:      string;
}

export type EmployeesType = {
  _id:            string;
  id:             string | undefined;
  companyId:      string | undefined;
  name:           string;
  lastname:       string;
  occupation:     string;
  employeeId:     number | undefined;
  permissions:    string[];
  photo?:         string | undefined;
  email?:         string;
  phone?:         string;
  birthday?:      string;
  note?:          string;
  isDisabled:     boolean
}

export type CollocationType = {
  [key:string] : string[]
}

export type VisitStatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

export type VisitorsType = {
  idType?:            string | null | undefined;
  signature?:         string | undefined;
  selectedVisitor:    EmployeesType;
};

export type ClientsGuests = {
  guestName: string;
  companyName?: string;
}

export type VisitsType = {
  id:                 number;
  visitPurpose:       string[];
  visitStatus:        VisitStatusType;
  visitors:           VisitorsType[];
  dlcEmployees:       string;
  visitAddress:       string
  visitingClient:     string;
  clientsGuests:      ClientsGuests[];
  carPlates:          string[];
  signature:          string;
  visitCollocation:   CollocationType
  visitorsIdType:     string;
  creationDate:       string;
  creationTime:       string;
  startDate:          string;
  startTime:          string;
  endDate:            string;
  endTime:            string;
  companyId:          number;
  scheduledVisitTime: string | undefined;
}

export type CollocationsType = {
  id: number;
  premises: {
    premiseName: string;
    racks: string[]
  }[]
  site: string;
}

export type CollocationsSites = {
  [key: string]: Array<{
    [key: string]: string[];
  }>;
};

export type ModalStateType = {
  editClientsEmployee:       boolean;
  edit:                      boolean;
  openEmployeeAdditionModal: boolean;
  isCompanyAdded:            boolean;
  isModalOpen:               boolean;
}

export type FilterOptions = {
  filterName: string;
  filterOptions: {
      value: string | number;
      label: string;
  }[];
}[]

export type SubClientsCollocationsType = {
  site: string;
  id:   number;
  premises: {
      premiseName:  string;
      racks:        string[];
  }[];
}[]

export interface CheckedPremises {
  [premiseName: string]: string[];
}

export interface CheckedList {
  [site: string]: CheckedPremises[];
}

export interface CheckAllStates {
  [key: string]: boolean;
}

export interface State {
  checkedList:    CheckedList[];
  checkAllStates: CheckAllStates;
}

export interface Permissions {
  _id:  string
  name: string | undefined
}

export type Premises = {
  name:   string;
  siteId: string;
  _id:    string;
}

export type Racks = {
  id:         string | undefined;
  name:       string | undefined;
  _id:        string | undefined
  premiseId:  string | undefined;
}

export type Sites = {
  name:       string;
  _id:         string;
  label:       React.ReactNode;
  children?:  React.ReactNode;
  key:        string
}