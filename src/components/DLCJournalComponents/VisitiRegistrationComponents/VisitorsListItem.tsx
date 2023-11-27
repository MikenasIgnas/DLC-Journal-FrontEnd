import { Form, Select } from 'antd'
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'

type VisitorsListItemProps = {
  removeFromList: (id: number) => void;
  clients: {
    _id: string;
    companyId: string | undefined;
    name: string;
    lastName: string;
    occupation: string;
    employeeId: string | undefined;
    permissions: string[];
    employeePhoto?: string | undefined;
    email?: string | undefined;
    phoneNr?: string | undefined;
    birthday?: string | undefined;
    notes?: string | undefined;
  }[];
};

const VisitorsListItem = ({ clients }: VisitorsListItemProps) => {
  const signatureCanvasRef = React.useRef<SignatureCanvas>(null)
  const options = [
    {
      value: 'Pasas',
      label: 'Pasas',
    },
    {
      value: 'Tapatybės Kortelė',
      label: 'Tapatybės Kortelė',
    },
    {
      value: 'Darbuotojo Pažymėjimas',
      label: 'Darbuotojo Pažymėjimas',
    },
  ]

  return (
    <>
      {clients.map((el) => (
        <Form.List key={el._id} name={el.name}>
          {(fields) => (
            <div>
              {fields.map(({ name, ...rest }, index) => (
                <div key={name}>
                  <Form.Item name={[name, index]}>
                    <Select style={{ width: '150px' }} options={options} />
                  </Form.Item>
                  <SignatureCanvas
                    penColor='black'
                    canvasProps={{ width: 500, height: 200, style: { backgroundColor: '#f4f4f4' } }}
                    ref={signatureCanvasRef}
                  />
                </div>
              ))}
            </div>
          )}
        </Form.List>
      ))}
    </>
  )
}

export default VisitorsListItem