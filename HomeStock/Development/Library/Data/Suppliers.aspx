<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Suppliers.aspx.cs" Inherits="HomeStock.Development.Library.Data.Suppliers" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Data.Suppliers" TagPrefix="Supplier" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Data.Schemas" TagPrefix="Schema" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Supplier:WebAPI runat="server" ID="apiHomeStock" SchemaID="homeStockSchema" >
        <EndPoint Url="/api/owner/{0}/home/{1}/container/{2}/inventory/{3}">
            <EndPointFragments>
                <Supplier:EndPointFragment Entity="Owner" IdentifierField="Id" />
                <Supplier:EndPointFragment Entity="Home" IdentifierField="Id" />
                <Supplier:EndPointFragment Entity="Container" IdentifierField="Id" />
                <Supplier:EndPointFragment Entity="Stock" IdentifierField="Id" />
            </EndPointFragments>
        </EndPoint>
    </Supplier:WebAPI>

    <Schema:Schema runat="server" ID="homeStockSchema">
        <Entities>
            <Schema:Entity Name="Owner">
                <Columns>
                    <Schema:Column Name="Id" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                </Columns>
            </Schema:Entity>
            <Schema:Entity Name="Home">
                <Columns>
                    <Schema:Column Name="Id" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                    <Schema:Column Name="OwnerId" />
                </Columns>
            </Schema:Entity>
            <Schema:Entity Name="Container">
                <Columns>
                    <Schema:Column Name="Id" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                    <Schema:Column Name="HomeId" />
                </Columns>
            </Schema:Entity>
            <Schema:Entity Name="Stock">
                <Columns>
                    <Schema:Column Name="Id" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                    <Schema:Column Name="ContainerId" />
                    <Schema:Column Name="Tags" />
                    <Schema:Column Name="Expiry" />
                </Columns>
            </Schema:Entity>
        </Entities>
    </Schema:Schema>
<%--    <Supplier:APISupplier runat="server" ID="apiSupplier" EndPoint="SomeBullShit" SchemaID="ASchemaID"  />

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
    </Schema:Schema>--%>

</asp:content>
