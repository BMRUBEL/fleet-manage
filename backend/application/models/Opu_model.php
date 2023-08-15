<?php
class Opu_model extends CI_Model
{
    public function getDriver()
    {
        return $this->db->select('id, name')->where('role', 'driver')->get('admin')->result();
    }
    public function savedriverpayment($data)
    {
         $this->db->insert('driver_payments', $data);
    }
    public function getPayment()
    {
        return $this->db->select('driver_payments.*, admin.name AS drivername')
        ->from('driver_payments')
        ->join('admin', 'admin.id = driver_payments.driver_id')
        ->where("admin.role='driver'")
        ->get()->result();
    }
    public function delete_payment($id)
    {
        $this->db->where('id',$id)->delete('driver_payments');
    }
    public function edit_payment($id)
    {
        return $this->db->where('id',$id)->get('driver_payments')->row();
    }
    function update_payment($data)
    {
        $this->db->where('id',$data['id'])->update('driver_payments', $data);
    }
}

?>