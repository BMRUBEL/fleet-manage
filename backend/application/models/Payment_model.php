<?php
class Payment_model extends CI_Model
{
    public function getVehi()
    {
        return $this->db->get("vehicles")->result();
    }

    public function setVehi($data)
    {
        return $this->db->insert("income_expense", $data);
    }

    public function getPmnts()
    {

        $this->db->select('income_expense.*, vehicles.name');
        $this->db->from('income_expense');
        $this->db->join('vehicles', 'vehicles.id=income_expense.vehicle_id');
        $query = $this->db->get();
        return $query->result();
    }

    public function pmntDelete($id)
    {
        $this->db->where("id", $id)->delete("income_expense");
    }

    public function getPerIdm($id)
    {

        $this->db->select('income_expense.*, vehicles.name');
        $this->db->from('income_expense');
        $this->db->join('vehicles', 'vehicles.id=income_expense.vehicle_id');
        $this->db->where('income_expense.id', $id);
        $query = $this->db->get();
        return $query->row();
    }


    public function pmntEdit($id)
    {
        $this->db->where("id", $id)->get("income_expense");
        // $this->db->select('income_expense.*, vehicles.name');
        // $this->db->from('income_expense');
        // $this->db->join('vehicles', 'vehicles.id=income_expense.vehicle_id');
        // $this->db->where('income_expense.id', $vid);
        // $query = $this->db->get();
        // return $query->row();
    }

    public function updateVehi($data)
    {
        return $this->db->where("id", $data['id'])->update("income_expense", $data);
    }

    // public function getVehicle_Report($data)
    // {
    //     $this->db->select('vendor_payments.paid_amount as VendorPayment, maintenances.cost as maintenCost, fuels.amount as fuelCost');
    //     $this->db->from('vendor_payments');
    //     $this->db->join('maintenances', 'maintenances.vehicle_id = vendor_payments.vehicle_id');
    //     $this->db->join('fuels', 'fuels.vehicle_id = maintenances.vehicle_id');
    //     $this->db->where('vendor_payments.vehicle_id', $data['vehicle_id']);
    //     $query = $this->db->get();
    //     return $query->result();
    // }
}
