﻿namespace HomeStockLibrary.Data.Archives.Base.WebAPI
{
    public interface IEndPointFragment
    {
        string Entity { get; set; }

        string IdentifierField { get; set; }
    }
}