<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Suppliers.aspx.cs" Inherits="HomeStock.Development.Library.Data.Suppliers" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Data.Suppliers" TagPrefix="Supplier" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Data.Schemas" TagPrefix="Schema" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Supplier:APISupplier runat="server" ID="apiSupplier" EndPoint="SomeBullShit" SchemaID="ASchemaID"  />

    <Schema:Schema runat="server" ID="ASchemaID">
        <Entities>
            <Schema:Entity Name="TestEntityOne">
                <Columns>
                    <Schema:Column Name="1.1" />
                    <Schema:Column Name="1.2" />
                </Columns>
            </Schema:Entity>
            <Schema:Entity Name="TestEntityTwo">
                <Columns>
                    <Schema:Column Name="2.1" />
                    <Schema:Column Name="2.2" />
                </Columns>
            </Schema:Entity>
        </Entities>
    </Schema:Schema>

</asp:content>
