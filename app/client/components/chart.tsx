import React, { useState } from 'react'

import { AreaChart, BarChart2, FileSearch, LineChart, Loader2 } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

import { AreaVariant } from '@/components/chart-area-variant';
import { BarVariant } from '@/components/chart-bar-variant';
import { LineVariant } from '@/components/chart-line-variant';
import { ComposedVariant } from '@/components/chart-line-variant';


type Props = {
    data?: {
        date: string;
        number: number;
        amount: number;
    }[];
}

export const Chart = ({
    data = []
}: Props) => {

    const [chartType, setChartType] = useState("area");

    const onTypeChange = (type: string) => {
        // TODO: Add Paywall
        setChartType(type);
    }

    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Requests
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="area">
                            <div className='flex items-center'>
                                <AreaChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Area chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className='flex items-center'>
                                <BarChart2 className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Bar chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line">
                            <div className='flex items-center'>
                                <LineChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Line chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="composed">
                            <div className='flex items-center'>
                                <LineChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Composed Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

            </CardHeader>
            <CardContent>
                {
                    data.length === 0
                        ? (<div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full '>
                            <FileSearch className='size-6 text-muted-foreground' />
                            <p className='text-muted-foreground text-sm'>
                                No data for this period
                            </p>
                        </div>)
                        : (
                            <>
                                {chartType === 'area' && <AreaVariant data={data} />}
                                {chartType === 'bar' && <BarVariant data={data} />}
                                {chartType === 'line' && <LineVariant data={data} />}
                                {chartType === 'composed' && <ComposedVariant data={data} />}
                            </>
                        )
                }
            </CardContent>
        </Card>
    )
}


export const ChartLoading = () => {

    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-8 lg:w-[120px] w-full' />
            </CardHeader>
            <CardContent>
                <div className='h-[350px] w-full flex items-center justify-center'>
                    <Loader2 className='size-6 text-slate-300 animate-spin' />
                </div>
            </CardContent>
        </Card>
    )
}