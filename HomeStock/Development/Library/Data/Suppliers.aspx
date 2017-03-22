<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Suppliers.aspx.cs" Inherits="HomeStock.Development.Library.Data.Suppliers" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Data.Suppliers" TagPrefix="Supplier" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Supplier:APISupplier runat="server" ID="apiSupplier" EndPoint="SomeBullShit"  />

</asp:content>
