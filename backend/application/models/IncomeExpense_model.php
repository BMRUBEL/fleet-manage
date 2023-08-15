<?php

class IncomeExpense_model extends CI_Model
{
    // public function getVehicle_Report($data)
    // {
    //     $this->db->select('vendor_payments.paid_amount as VendorPayment,maintenances.cost as maintenCost,fuels.amount as fuelCost,driver_payments.amount as driverCost');
    //     $this->db->from('vendor_payments');
    //     $this->db->join('maintenances', 'maintenances.vehicle_id=vendor_payments.vehicle_id');
    //     $this->db->from('maintenances');
    //     $this->db->join('fuels', 'fuels.vehicle_id=maintenances.vehicle_id');
    //     $this->db->from('driver_payments');
    //     $this->db->join('fuels', 'fuels.vehicle_id=driver_payments.vehicle_id');
    //     $this->db->where('vehicle_id', $data['vehicle_id']);
    //     $datas = $this->db->get();
    //     $query = $this->db->get();
    //     return $datas->result();
    // }

    public function getVehicle_Report($data)
    {
        $this->db->select('vendor_payments.paid_amount as VendorPayment, maintenances.cost as maintenCost, fuels.amount as fuelCost');
        $this->db->from('vendor_payments');
        $this->db->join('maintenances', 'maintenances.vehicle_id = vendor_payments.vehicle_id');
        $this->db->join('fuels', 'fuels.vehicle_id = maintenances.vehicle_id');
        $this->db->where('vendor_payments.vehicle_id', $data['vehicle_id']);
        $query = $this->db->get();
        return $query->result();
    }

    public function currentMonth_Income($startDate, $endDate)
    {
        $this->db->select('vendor_payments.paid_amount as VendorPayment, maintenances.cost as maintenCost, fuels.amount as fuelCost');
        $this->db->from('vendor_payments');
        $this->db->join('maintenances', 'maintenances.vehicle_id = vendor_payments.vehicle_id');
        $this->db->join('fuels', 'fuels.vehicle_id = maintenances.vehicle_id');
        // $this->db->where('vendor_payments.payment_date', $date);
        $this->db->where('date_column >=', $startDate);
        $this->db->where('date_column <=', $endDate);
        $query = $this->db->get();
        return $query->result();
    }

    public function getVid()
    {
        $this->db->select('id');
        $this->db->from('vehicles');
        $this->db->order_by('id', 'ASC');
        $this->db->limit(1);
        return $result = $this->db->get()->row()->id;
    }


    public function getReport($id, $startDate, $endDate)
    {
        // "BETWEEN" Active Recorde Style
        // $this->db->where(" `date` BETWEEN '2023-05-01' AND '2023-05-14' ");

        // manually Between Sryle
        // $this->db->where('DATE(fill_date) >=', $startDate);
        // $this->db->where('DATE(fill_date) <=', $endDate);

        // Income 
        $this->db->select('*');
        $this->db->from('bookings');
        $this->db->where('vehicle_id', $id);
        $this->db->where("DATE(end_date) between '" . $startDate . "' and '" . $endDate . "' ",);
        $this->db->where('status', 'completed');
        $bookings = $this->db->get()->result();

        if ($bookings == null) {
            $totlaIncome = 0;
            $detailsData = [];
        } else {
            $totlaIncome = 0;
            $detailsData = [];
            foreach ($bookings as $booking) {
                $totlaIncome += $booking->amount;
                $detailsData[] = ['date' => $booking->end_date, 'amount' => $booking->amount, 'description' => $booking->type, 'type' => 'Booking Payment'];
            }
        }

        // expense
        $this->db->select('*');
        $this->db->from('fuels');
        $this->db->where('vehicle_id', $id);
        $this->db->where("DATE(fill_date) BETWEEN '" . $startDate . "' AND '" . $endDate . "'");
        $fuels = $this->db->get()->result();

        if ($fuels == null) {
            $totlaExpense = 0;
        } else {
            $totlaExpense = 0;
            foreach ($fuels as $fuel) {
                $totlaExpense += $fuel->amount;
                $detailsData[] = ['date' => $fuel->fill_date, 'amount' => $fuel->amount, 'description' => 'Fuel refill', 'type' => 'expense'];
            }
        }

        // expense
        $this->db->select('*');
        $this->db->from('income_expense');
        $this->db->where('vehicle_id', $id);
        $this->db->where("DATE(trans_date) between '" . $startDate . "' and '" . $endDate . "'",);
        $this->db->where('type', 'expense');
        $IncExpenses = $this->db->get()->result();

        if ($IncExpenses == null) {
            $totlaExpense += 0;
        } else {
            foreach ($IncExpenses as $IncExpense) {
                $totlaExpense += $IncExpense->amount;
                $detailsData[] = ['date' => $IncExpense->trans_date, 'amount' => $IncExpense->amount, 'description' => $IncExpense->remarks, 'type' => $IncExpense->type];
            }
        }

        // Income
        $this->db->select('*');
        $this->db->from('income_expense');
        $this->db->where('vehicle_id', $id);
        $this->db->where("DATE(trans_date) between '" . $startDate . "' and '" . $endDate . "'",);
        $this->db->where('type', 'income');
        $IncomeExps = $this->db->get()->result();

        if ($IncomeExps == null) {
            $totlaIncome += 0;
        } else {
            foreach ($IncomeExps as $IncomeExp) {
                $totlaIncome += $IncomeExp->amount;
                $detailsData[] = ['date' => $IncomeExp->trans_date, 'amount' => $IncomeExp->amount, 'description' => $IncomeExp->remarks, 'type' => $IncomeExp->type];
            }
        }

        // expense
        $this->db->select('*');
        $this->db->from('maintenances');
        $this->db->where('vehicle_id', $id);
        $this->db->where("DATE(end_date) between '" . $startDate . "' and '" . $endDate . "' ");
        $this->db->where("status", "completed");
        $maintnces = $this->db->get()->result();

        if ($maintnces == null) {
            $totlaExpense += 0;
        } else {
            foreach ($maintnces as $maintnc) {
                $totlaExpense += $maintnc->cost;
                $detailsData[] = ['date' => $maintnc->end_date, 'amount' => $maintnc->cost, 'description' => $maintnc->details, 'type' => 'expense'];
            }
        }

        // expense
        $this->db->select('*');
        $this->db->from('vendor_payments');
        $this->db->where('vehicle_id', $id);
        $this->db->where("DATE(payment_date)  between '" . $startDate . "'and '" . $endDate . "'");
        $vendors = $this->db->get()->result();


        if ($vendors == null) {
            $totlaExpense += 0;
        } else {
            foreach ($vendors as $vendor) {
                $totlaExpense += $vendor->paid_amount;
                $detailsData[] = ['date' => $vendor->payment_date, 'amount' => $vendor->paid_amount, 'description' => 'Vendor Payment', 'type' => 'expense'];
            }
        }
        $profit = bcsub($totlaIncome, $totlaExpense);

        return [$totlaIncome, $totlaExpense, $profit, $detailsData];
    }








    // public function getExp($id, $strtDate,$endDate)
    // {
    //     $this->db->select('*');
    //     $this->db->from('fuels');
    //     $this->db->where('vehicle_id', $id);
    //     $this->db->where('date(fill_date)' between $strtDate, $endDate);
    //     $fuel = $this->db->get()->row();

    //     // if ($fuel == null) {
    //     //     $fu = 0;
    //     //     $totlFue = 0;
    //     // } else {
    //     //     $fu = $fuel->amount;
    //     //     $totlFue = $fuel;
    //     // }

    //     // $this->db->select('*');
    //     // $this->db->from('maintenances');
    //     // $this->db->where('vehicle_id', $id);
    //     // $this->db->where('date(end_date)', $date);
    //     // $maintence = $this->db->get()->row();

    //     // if ($maintence == null) {
    //     //     $mainte = 0;
    //     //     $totlMainte = 0;
    //     // } else {
    //     //     $mainte = $maintence->cost;
    //     //     $totlMainte = $maintence;
    //     // }

    //     // $this->db->select('*');
    //     // $this->db->from('vendor_payments');
    //     // $this->db->where('vehicle_id', $id);
    //     // $this->db->where('date(payment_date)', $date);
    //     // $vendor_pay = $this->db->get()->row();

    //     // if ($vendor_pay == null) {
    //     //     $ven_pay = 0;
    //     //     $totlVendorPay = 0;
    //     // } else {
    //     //     $ven_pay = $vendor_pay->paid_amount;
    //     //     $totlVendorPay = $vendor_pay;
    //     // }

    //     // $this->db->select('*');
    //     // $this->db->from('income_expense');
    //     // $this->db->where('vehicle_id', $id);
    //     // $this->db->where('date(trans_date)', $date);
    //     // $this->db->where('type', 'expense');
    //     // $addiCost = $this->db->get()->row();

    //     // if ($addiCost == null) {
    //     //     $extraCost = 0;
    //     //     $totlAddCost = 0;
    //     // } else {
    //     //     $extraCost = $addiCost->amount;
    //     //     $totlAddCost = $addiCost;
    //     // }

    //     // $incomAmount = $this->db->select('*')
    //     //     ->from('income_expense')
    //     //     ->where('vehicle_id', $id)
    //     //     ->where('date(trans_date)', $date)
    //     //     ->where('type', 'income')
    //     //     ->get()
    //     //     ->result();

    //     // if ($incomAmount == null) {
    //     //     $finl_incomAmount = 0;
    //     //     $totlfnlincomAmount = 0;
    //     // } else {
    //     //     $finl_incomAmount = 0;
    //     //     $totlfnlincomAmount = [];
    //     //     foreach ($incomAmount as $inAmnt) {
    //     //         $finl_incomAmount += $inAmnt->amount;
    //     //         $totlfnlincomAmount[] = $inAmnt;
    //     //     }
    //     // }

    //     // $bookAmount = $this->db->select('*')
    //     //     ->from('bookings')
    //     //     ->where('vehicle_id', $id)
    //     //     ->where('date(end_date)', $date)
    //     //     ->where('status', 'completed')
    //     //     ->get()
    //     //     ->row();

    //     // if ($bookAmount == null) {
    //     //     $finl_bookAmount = 0;
    //     //     $totl_bookAmount = 0;
    //     // } else {
    //     //     $finl_bookAmount = $bookAmount->amount;
    //     //     $totl_bookAmount = $bookAmount;
    //     // }

    //     // $expenseM = $fu + $mainte + $ven_pay + $extraCost;
    //     // $incomeM = $finl_bookAmount + $finl_incomAmount;
    //     // $profit = bcsub($incomeM, $expenseM);
    //     // $details = [$totlFue, $totlMainte, $totlVendorPay, $totlAddCost, $totl_bookAmount, $totlfnlincomAmount];
    //     // return [$expenseM, $incomeM, $profit, $details];
    //     // return [$finl_incomAmount, $totlfnlincomAmount];
    // }
}
