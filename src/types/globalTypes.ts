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
        [key: string]: boolean;
      }[]
    },
  }[]
  values: {
      [key: string]: {
        [key: string]: boolean;
      }[]
    },

};

export type UserType = {
  key:                string;
  email:              string;
  secret:             string;
  userRole:           string;
  username:           string;
  dateCreated:        string;
  dateDeleted:        string;
  status:             string;
  _id:                string;
  id:                 number;
};

export type TokenType = {
  username:           string;
  theme:              boolean;
  secret:             string;
  userRole:           string;
  userId:             string;
  iat:                number;
  exp:                number;
};

export type ChecklistPhotosType = {
  photo:              string;
  photoId:            string;
}

export type ColocationDataType = {
  [key: string]: string[];
};

export type CompaniesType = {
  _id:                    string;
  id:                     string;
  parentCompanyId?:       string;
  wasMainClient?:         boolean;
  companyInfo: {
      J13?:               ColocationDataType[];
      T72?:               ColocationDataType[];
      companyName:        string;
      companyDescription: string;
      companyPhoto:       string;
      subClient?: {
      subClientId: string;
      subClientCompanyName: string
      }[]
  };
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
  companyId:      string | undefined;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     string | undefined;
  permissions:    string[];
  employeePhoto?: string;
  email?:         string;
  phoneNr?:       string;
  birthday?:      string;
  notes?:         string;
}
export type CollocationsType = {
  id: string;
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
  editClientsEmployee:           boolean;
  edit:                          boolean;
  isEmployeeAdditionModalOpen:   boolean;
  isCompanyAdded:                boolean;
  isModalOpen:                   boolean;
}