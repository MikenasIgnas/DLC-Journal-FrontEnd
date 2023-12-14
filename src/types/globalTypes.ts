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
  id:                 number;
  key:                string;
  email:              string;
  secret:             string;
  userRole:           string;
  username:           string;
  dateCreated:        string;
  dateDeleted:        string;
  status:             string;
  _id:                string;
};

export type TokenType = {
  username:           string;
  theme:              boolean;
  secret:             string;
  userRole:           string;
  userId:             string;
  iat:                number;
  exp:                number;
  id:                 number;
};

export type ChecklistPhotosType = {
  photo:              string;
  photoId:            string;
}

export type ColocationDataType = {
  [key: string]: string[];
};

export type CompaniesType = {
  _id:              string;
  id:               number;
  parentCompanyId?: number;
  wasMainClient?:   boolean;
  companyInfo:      CompanyInfoType;
};

export type CompanyInfoType = {
  [site: string]: ColocationDataType[] | undefined;
} & {
  companyName: string;
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
  companyId:      number | undefined;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     number | undefined;
  permissions:    string[];
  employeePhoto?: string;
  email?:         string;
  phoneNr?:       string;
  birthday?:      string;
  notes?:         string;
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

export type VisitsType = {
  id:                 number;
  visitPurpose:       string[];
  visitStatus:        VisitStatusType;
  visitors:           VisitorsType[];
  dlcEmployees:       string;
  visitAddress:       string;
  visitingClient:     string;
  clientsGuests:      string[];
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
      value: string;
      label: string;
  }[];
}[]
export type SubClientsCollocationsType = {
  site: string;
  id: number;
  premises: {
      premiseName: string;
      racks: string[];
  }[];
}[]